import GObject from 'gi://GObject';
import Settings from '../helpers/settings.js';
import * as windowHelper from '../helpers/window.js'
import * as screenHelper from '../helpers/screen.js'

export default GObject.registerClass(
    class Mover extends GObject.Object {

        constructor() {
            super()
        }

        moveRight() {
            this._move(-1, false);
        }

        moveLeft() {
            this._move(1, false);
        }

        moveUp() {
            this._move(-1, true);
        }

        moveDown() {
            this._move(1, true);
        }

        _move(direction, vertical) {
            let window = windowHelper.getFocusedWindow();
            if (!window) {
                return;
            }

            let workspace = windowHelper.getWorkspace(window);

            let screenSize = screenHelper.getScreenSize(workspace);
            let windowSize = windowHelper.getWindowSize(window);

            let amount = Settings.getResizeAmount() * direction;

            if (vertical) {
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

        destroy() { }
    }
);