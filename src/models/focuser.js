import GObject from 'gi://GObject';
import * as windowHelper from '../helpers/window.js'

export default GObject.registerClass(
    class Focuser extends GObject.Object {

        constructor() {
            super()
        }

        focusRight() {
            this._focus(1, false);
        }

        focusLeft() {
            this._focus(-1, false);
        }

        focusUp() {
            this._focus(-1, true);
        }

        focusDown() {
            this._focus(1, true);
        }

        _focus(direction, vertical) {
            let window = windowHelper.getFocusedWindow();

            let [currentWindowIndex, windows] = windowHelper.getNearbyWindows(window, vertical);

            currentWindowIndex = (windows.length + currentWindowIndex + direction) % windows.length;

            windowHelper.focusWindow(windows[currentWindowIndex].window);
        }

        destroy() { }
    }
);