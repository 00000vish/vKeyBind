import GObject from 'gi://GObject';

import Direction from '../enums/direction.js';
import Settings from '../helpers/settings.js';
import * as windowHelper from '../helpers/window.js'

export default GObject.registerClass(
    class Switcher extends GObject.Object {

        constructor() {
            super()
        }

        switchRight() {
            this._switch(Direction.Right);
        }

        switchLeft() {
            this._switch(Direction.Left);
        }

        switchUp() {
            this._switch(Direction.Up);
        }

        switchDown() {
            this._switch(Direction.Down);
        }

        _switch(direction) {
            let window = windowHelper.getFocusedWindow();
            let windows = windowHelper.getNearbyWindows(window, direction);
            if (windows.length === 0) {
                return;
            }

            let windowSize = window.size;
            let otherWindow = windows[0];
            let otherWindowSize = otherWindow.size;

            if (Settings.isKeepOriginalSize()) {
                this._switchSizes(direction, windowSize, otherWindowSize)
            } else {
                [windowSize, otherWindowSize] = [otherWindowSize, windowSize]
            }

            windowHelper.resizeWindow(window, windowSize);
            windowHelper.resizeWindow(otherWindow, otherWindowSize);
        }

        _switchSizes(direction, sizeA, sizeB) {
            if (direction === Direction.Right || direction === Direction.Down) {
                [sizeA, sizeB] = [sizeB, sizeA]
            }

            if (Direction.isVertical(direction)) {
                sizeA.y = sizeB.y
                sizeB.y = sizeA.y + sizeA.height;
            } else {
                sizeA.x = sizeB.x;
                sizeB.x = sizeA.x + sizeA.width;
            }
        }

        destroy() { }
    }
);