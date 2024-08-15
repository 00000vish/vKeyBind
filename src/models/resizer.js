import GObject from 'gi://GObject';
import Settings from '../helpers/settings.js';
import * as windowHelper from '../helpers/window.js'

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

            let size = windowHelper.getWindowSize(window);
            let amount = Settings.getResizeAmount() * (grow ? 1 : -1);

            if (vertical) {
                size.height += amount;
            } else {
                size.width += amount;
            }

            windowHelper.resizeWindow(window, size);
        }

        destroy() { }
    }
);