import GObject from 'gi://GObject';
// import Setting from './helpers/settings.js';
// import * as windowHelper from './helpers/window.js'
// import * as screenHelper from './helpers/screen.js'
import logger from '../helpers/logger.js';

export default GObject.registerClass(
    class Switcher extends GObject.Object {

        constructor() {
            super()
        }

        _getWindowsSizeInfo() {
            let window = global.display.get_focus_window();
            let workspace = window.get_workspace();
            let windows = workspace.list_windows();

            let windowIndex = 0;

            let sizeInfos = [];
            for (let v = 0; v < windows.length; v++) {
                if (windows[v] === window)
                    windowIndex = v;

                let size = windows[v].get_frame_rect();
                sizeInfos.push(
                    {
                        window: window[v],
                        size: size
                    }
                );
            }

            return windowIndex, sizeInfos.sort(this._sortWindow);
        }

        _sortWindow(windowA, windowB) {

        }

        switchRight() {
            var windowIndex, windowInfos = this._getWindowsSizeInfo();

            logger("swtich right");
        }

        switchLeft() {
            logger("swtich left");
        }

        switchUp() {
            logger("swtich up");
        }

        switchDown() {
            logger("swtich down");
        }

        destroy() {
        }
    }
);