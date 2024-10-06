import GObject from 'gi://GObject';

import Direction from '../enums/direction.js';
import * as windowHelper from '../helpers/window.js'

export default GObject.registerClass(
    class Focuser extends GObject.Object {

        constructor() {
            super()
        }

        focusRight() {
            this._focus(Direction.Right);
        }

        focusLeft() {
            this._focus(Direction.Left);
        }

        focusUp() {
            this._focus(Direction.Up);
        }

        focusDown() {
            this._focus(Direction.Down);
        }

        _focus(direction) {
            let window = windowHelper.getFocusedWindow();
            if (!window) {
                return;
            }

            let windows = windowHelper.getNearbyWindows(window, direction);
            if (window.length === 0) {
                return;
            }

            windowHelper.focusWindow(windows[0]);
        }

        destroy() { }
    }
);