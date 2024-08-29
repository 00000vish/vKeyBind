import GObject from 'gi://GObject';
import Settings from '../helpers/settings.js';
import * as windowHelper from '../helpers/window.js'
import * as screenHelper from '../helpers/screen.js'

export default GObject.registerClass(
    class Resizer extends GObject.Object {

        constructor() {
            super()
        }

        shrinkX() {
            this._resize(false, false);
        }

        shrinkY() {
            this._resize(false, true);
        }

        growX() {
            this._resize(true, false);
        }

        growY() {
            this._resize(true, true);
        }

        _resize(grow, vertical) {
            let window = windowHelper.getFocusedWindow();
            if (!window) {
                return;
            }

            let workspace = windowHelper.getWorkspace(window);
            let screenSize = screenHelper.getScreenSize(workspace);

            let windowSize = windowHelper.getWindowSize(window);
            let amount = Settings.getResizeAmount() * 10 * (grow ? 1 : -1);

            if (vertical) {
                windowSize.height += amount;
            } else {
                windowSize.width += amount;
            }

            let windowWidth = windowSize.x + windowSize.width;
            let screenWidth = screenSize.x + screenSize.width;

            let windowHeight = windowSize.y + windowSize.height;
            let screenHeight = screenSize.y + screenSize.height;

            if (windowWidth > screenWidth) {
                windowSize.width -= windowWidth - screenWidth;
            }

            if (windowHeight > screenHeight) {
                windowSize.height -= windowHeight - screenHeight;
            }

            windowHelper.resizeWindow(window, windowSize);
        }

        destroy() { }
    }
);