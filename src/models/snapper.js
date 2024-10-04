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
            let [currentWindowIndex, windows] = this._getNearBySnapableWindow(vertical, direction);

            let otherWindowIndex = currentWindowIndex + direction;

            if (otherWindowIndex < 0 || otherWindowIndex >= windows.length) {
                this._snapToScreenEdge(direction, vertical, windows[currentWindowIndex])
                return;
            }

            let currentWindow = windows[currentWindowIndex];

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

            windowHelper.resizeWindow(currentWindow, currentWindowSize);
        }

        _getNearBySnapableWindow(vertical, direction) {
            let window = windowHelper.getFocusedWindow();
            let [windowIndex, windows] = windowHelper.getNearbyWindows(window, vertical, direction, true);
            let windowInfo = windows[windowIndex];

            windows = windows.filter(x => {
                if (x === windowInfo) {
                    return true;
                }

                if (Math.abs(windowInfo.size.x - (x.size.x + x.size.width)) === 0 ||
                    Math.abs((windowInfo.size.x + windowInfo.size.width) - x.size.x) === 0 ||
                    Math.abs(windowInfo.size.y - (x.size.y + x.size.height)) === 0 ||
                    Math.abs((windowInfo.size.y + windowInfo.size.height) - x.size.y) === 0) {
                    return false;
                }

                return true;
            });

            windowIndex = windows.indexOf(windowInfo);

            return [windowIndex, windows];
        }

        _snapToScreenEdge(direction, vertical, window) {
            let workspace = windowHelper.getWorkspace(window);
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

            windowHelper.resizeWindow(window, window.size);
        }

        destroy() { }
    }
);