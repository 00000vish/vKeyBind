import GObject from 'gi://GObject';

import Direction from '../enums/direction.js';
import Settings from '../helpers/settings.js';
import * as windowHelper from '../helpers/window.js'
import * as screenHelper from '../helpers/screen.js'

export default GObject.registerClass(
    class Mover extends GObject.Object {

        constructor() {
            super()
        }

        moveRight() {
            this._move(Direction.Right);
        }

        moveLeft() {
            this._move(Direction.Left);
        }

        moveUp() {
            this._move(Direction.Up);
        }

        moveDown() {
            this._move(Direction.Down);
        }

        _move(direction) {
            let window = windowHelper.getFocusedWindow();
            if (!window) {
                return;
            }

            let amount = this._getWindowAdjustValue(direction);
            let workspace = windowHelper.getWorkspace(window);
            let screenSize = screenHelper.getScreenSize(workspace);
            let windowSize = window.size;

            if (direction === Direction.Up || direction === Direction.Down) {
                windowSize.y += amount;
            } else {
                windowSize.x += amount;
            }

            windowSize.x = windowSize.x < screenSize.x ? screenSize.x : windowSize.x;
            windowSize.y = windowSize.y < screenSize.y ? screenSize.y : windowSize.y;

            windowSize.x = windowSize.x + windowSize.width > screenSize.x + screenSize.width
                ? screenSize.x + screenSize.width - windowSize.width
                : windowSize.x;

            windowSize.y = windowSize.y + windowSize.height > screenSize.y + screenSize.height
                ? screenSize.y + screenSize.height - windowSize.height
                : windowSize.y;

            windowHelper.resizeWindow(window, windowSize);
        }
        
        _getWindowAdjustValue(direction) {
            let adjust = direction === Direction.Up || direction == Direction.Left ? -1 : 1;
            return Settings.getResizeAmount() * adjust;
        }

        destroy() { }
    }
);