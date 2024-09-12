import GObject from 'gi://GObject';
import * as windowHelper from '../helpers/window.js'
import * as screenHelper from '../helpers/screen.js'

export default GObject.registerClass(
    class Snapper extends GObject.Object {

        constructor() {
            super()
        }

        snapRight() {
            this._snap(1, false);
        }

        snapLeft() {
            this._snap(-1, false);
        }

        snapUp() {
            this._snap(-1, true);
        }

        snapDown() {
            this._snap(1, true);
        }

        _snap(direction, vertical) {
            let window = windowHelper.getFocusedWindow();

            let [currentWindowIndex, windows] = windowHelper.getNearbyWindows(window, vertical, direction, true);

            let otherWindowIndex = currentWindowIndex + direction;

            if (otherWindowIndex < 0 || otherWindowIndex >= windows.length) {
                this._snapToScreenEdge(direction, vertical, windows[currentWindowIndex])
                return;
            }

            let otherWindowSize = windows[otherWindowIndex].size;
            let currentWindowSize = windows[currentWindowIndex].size;

            if (vertical) {
                currentWindowSize.y = direction > 0
                    ? otherWindowSize.y - currentWindowSize.height
                    : otherWindowSize.y + otherWindowSize.height;
            } else {
                currentWindowSize.x = direction > 0
                    ? otherWindowSize.x - currentWindowSize.width
                    : otherWindowSize.x + otherWindowSize.width;
            }

            windowHelper.resizeWindow(window, currentWindowSize);
        }

        _snapToScreenEdge(direction, vertical, window) {
            let workspace = windowHelper.getWorkspace(window.window);
            let screenSize = screenHelper.getScreenSize(workspace);

            if (vertical) {
                window.size.y = direction < 0
                    ? screenSize.y
                    : screenSize.y + screenSize.height - window.size.height;
            } else {
                window.size.x = direction < 0
                    ? screenSize.x
                    : screenSize.x + screenSize.width - window.size.width;
            }

            windowHelper.resizeWindow(window.window, window.size);
        }

        destroy() { }
    }
);