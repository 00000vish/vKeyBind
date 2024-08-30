import GObject from 'gi://GObject';
import * as windowHelper from '../helpers/window.js'

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

            let [currentWindowIndex, windows] = windowHelper.getNearbyWindows(window, vertical);

            let otherWindowIndex = (windows.length + currentWindowIndex + direction) % windows.length;

            if (currentWindowIndex === otherWindowIndex) {
                return;
            }

            let otherWindowSize = windows[otherWindowIndex].size;
            let currentWindowSize = windows[currentWindowIndex].size;

            currentWindowSize.x = otherWindowSize.x;
            currentWindowSize.y = otherWindowSize.y;

            windowHelper.resizeWindow(window, currentWindowSize);
        }

        destroy() { }
    }
);