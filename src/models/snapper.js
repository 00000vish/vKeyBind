import GObject from 'gi://GObject';

import Direction from '../enums/direction.js';
import * as windowHelper from '../helpers/window.js';
import * as screenHelper from '../helpers/screen.js';

export default GObject.registerClass(
    class Snapper extends GObject.Object {
        constructor() {
            super();
        }

        snapRight() {
            this._snap(Direction.Right);
        }

        snapLeft() {
            this._snap(Direction.Left);
        }

        snapUp() {
            this._snap(Direction.Up);
        }

        snapDown() {
            this._snap(Direction.Down);
        }

        _snap(direction) {
            let window = windowHelper.getFocusedWindow();
            if (!window) {
                return;
            }

            let windows = this._getNearBySnapableWindow(window, direction);
            if (windows.length === 0) {
                this._snapToScreenEdge(direction, window);
                return;
            }

            let currentWindowSize = window.size;
            let otherWindowSize = windows[0].size;

            if (Direction.isVertical(direction)) {
                currentWindowSize.y =
                    direction === Direction.Down
                        ? otherWindowSize.y + currentWindowSize.height
                        : otherWindowSize.y - otherWindowSize.height;
            } else {
                currentWindowSize.x =
                    direction === Direction.Right
                        ? otherWindowSize.x + currentWindowSize.width
                        : otherWindowSize.x - otherWindowSize.width;
            }

            windowHelper.resizeWindow(window, currentWindowSize);
        }

        _getNearBySnapableWindow(window, direction) {
            let windows = windowHelper.getNearbyWindows(window, direction);
            if (windows.length === 0) {
                return windows;
            }

            windows = windows.filter((otherWindow) => {
                if (
                    Math.abs(window.size.x - (otherWindow.size.x + otherWindow.size.width)) === 0 ||
                    Math.abs(window.size.x + window.size.width - otherWindow.size.x) === 0 ||
                    Math.abs(window.size.y - (otherWindow.size.y + otherWindow.size.height)) === 0 ||
                    Math.abs(window.size.y + window.size.height - otherWindow.size.y) === 0
                ) {
                    return false;
                }

                let otherWindowMin = Direction.isVertical(direction) ? otherWindow.size.x : otherWindow.size.y;

                let otherWindowMax = Direction.isVertical(direction)
                    ? otherWindow.size.x + otherWindow.size.width
                    : otherWindow.size.y + otherWindow.size.height;

                let windowMin = Direction.isVertical(direction) ? window.size.x : window.size.y;

                let windowMax = Direction.isVertical(direction)
                    ? window.size.x + window.size.width
                    : window.size.y + window.size.height;

                return (
                    (windowMin < otherWindowMax && windowMax > otherWindowMin) ||
                    (otherWindowMin < windowMax && otherWindowMax > windowMin)
                );
            });

            return windows;
        }

        _snapToScreenEdge(direction, window) {
            let workspace = windowHelper.getWorkspace(window);
            let screenSize = screenHelper.getScreenSize(workspace);

            if (Direction.isVertical(direction)) {
                window.size.y =
                    direction === Direction.Up ? screenSize.y : screenSize.y + screenSize.height - window.size.height;
            } else {
                window.size.x =
                    direction === Direction.Left ? screenSize.x : screenSize.x + screenSize.width - window.size.width;
            }

            windowHelper.resizeWindow(window, window.size);
        }

        destroy() { }
    }
);
