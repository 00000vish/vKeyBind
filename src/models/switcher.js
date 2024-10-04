import GObject from 'gi://GObject';
import * as windowHelper from '../helpers/window.js'
import Settings from '../helpers/settings.js';

export default GObject.registerClass(
    class Switcher extends GObject.Object {

        constructor() {
            super()
        }

        switchRight() {
            this._switch(1, false);
        }

        switchLeft() {
            this._switch(-1, false);
        }

        switchUp() {
            this._switch(-1, true);
        }

        switchDown() {
            this._switch(1, true);
        }

        _switch(direction, vertical) {
            let window = windowHelper.getFocusedWindow();

            let [currentWindowIndex, windows] = windowHelper.getNearbyWindows(window, vertical, direction, true);

            let otherWindowIndex = currentWindowIndex + direction;

            if (otherWindowIndex < 0 || otherWindowIndex >= windows.length) {
                return;
            }

            let currentWindow = windows[currentWindowIndex];
            let otherWindow = windows[otherWindowIndex];

            let currentWindowSize = currentWindow.size;
            let otherWindowSize = otherWindow.size;

            if (!Settings.isKeepOriginalSize()) {
                [currentWindowSize, otherWindowSize] = [otherWindowSize, currentWindowSize]
            } else {
                let switchSizes = (windowA, windowB) => {
                    if (direction > 0) {
                        [windowA, windowB] = [windowB, windowA]
                    }

                    if (vertical) {
                        windowA.y = windowB.y
                        windowB.y = windowA.y + windowA.height;
                    } else {
                        windowA.x = windowB.x;
                        windowB.x = windowA.x + windowA.width;
                    }
                }

                switchSizes(currentWindowSize, otherWindowSize)
            }

            windowHelper.resizeWindow(currentWindow, currentWindowSize);
            windowHelper.resizeWindow(otherWindow, otherWindowSize);
        }

        destroy() { }
    }
);