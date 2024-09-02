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

            let [currentWindowIndex, windows] = windowHelper.getNearbyWindows(window, vertical, true);

            let otherWindowIndex = currentWindowIndex + direction;

            if (otherWindowIndex < 0 || otherWindowIndex >= windows.length) {
                return;
            }

            let currentWindowSize = windows[currentWindowIndex].size;
            let otherWindowSize = windows[otherWindowIndex].size;

            if (Settings.isKeepOriginalSize()) {
                if (vertical) {
                    [currentWindowSize.y, otherWindowSize.y] = [otherWindowSize.y, currentWindowSize.y]
                } else {
                    [currentWindowSize.x, otherWindowSize.x] = [otherWindowSize.x, currentWindowSize.x]
                }
            } else {
                [currentWindowSize, otherWindowSize] = [otherWindowSize, currentWindowSize]
            }

            windowHelper.resizeWindow(windows[currentWindowIndex].window, currentWindowSize);
            windowHelper.resizeWindow(windows[otherWindowIndex].window, otherWindowSize);
        }


        destroy() { }
    }
);