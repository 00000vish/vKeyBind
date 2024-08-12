import GObject from 'gi://GObject';
import * as windowHelper from '../helpers/window.js'
import logger from '../helpers/logger.js';

export default GObject.registerClass(
    class Switcher extends GObject.Object {

        constructor() {
            super()
        }

        _getWindowsSizeInfo(vertical) {
            let window = global.display.get_focus_window();
            let workspace = window.get_workspace();
            let windows = workspace.list_windows();

            let sizeInfos = [];
            for (let item of windows) {
                let size = item.get_frame_rect();
                sizeInfos.push(
                    {
                        window: item,
                        size: size
                    }
                );
            }

            sizeInfos = sizeInfos.sort(this._sortWindow.bind(vertical));

            let windowIndex = sizeInfos.findIndex(x => x.window === window);

            return [windowIndex, sizeInfos];
        }

        _sortWindow(windowA, windowB, vertical) {
            if (vertical) {
                return windowA.size.y - windowB.size.y;
            } else {
                return windowA.size.x - windowB.size.x;
            }
        }

        switchRight() {
            let [windowIndex, windowInfos] = this._getWindowsSizeInfo(false);

            windowIndex += 1;
            if (windowIndex > windowInfos.length)
                return;

            windowHelper.focusWindow(windowInfos[windowIndex].window);
        }

        switchLeft() {
            let [windowIndex, windowInfos] = this._getWindowsSizeInfo(false);

            windowIndex -= 1;
            if (windowIndex < 0)
                return;

            windowHelper.focusWindow(windowInfos[windowIndex].window);
        }

        switchUp() {
            let [windowIndex, windowInfos] = this._getWindowsSizeInfo(true);

            windowIndex += 1;
            if (windowIndex > windowInfos.length)
                return;

            windowHelper.focusWindow(windowInfos[windowIndex].window);
        }

        switchDown() {
            let [windowIndex, windowInfos] = this._getWindowsSizeInfo(true);

            windowIndex -= 1;
            if (windowIndex < 0)
                return;

            windowHelper.focusWindow(windowInfos[windowIndex].window);
        }

        destroy() {
        }
    }
);