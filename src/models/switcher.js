import GObject from 'gi://GObject';
import * as windowHelper from '../helpers/window.js'

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

        _switch(shiftIndex, vertical) {
            let window = windowHelper.getFocusedWindow();

            let [currentWindowIndex, windows] = windowHelper.getNearbyWindows(window, vertical);

            let otherWindowIndex = (windows.length + currentWindowIndex + shiftIndex) % windows.length;

            if (otherWindowIndex === currentWindowIndex) {
                return;
            }

            let currentWindowSize = windows[currentWindowIndex].size;
            let otherWindowSize = windows[otherWindowIndex].size;

            windowHelper.resizeWindow(windows[currentWindowIndex].window, otherWindowSize);
            windowHelper.resizeWindow(windows[otherWindowIndex].window, currentWindowSize);
        }


        destroy() { }
    }
);