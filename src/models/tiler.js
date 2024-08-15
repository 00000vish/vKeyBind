import GObject from 'gi://GObject';
import Setting from '../helpers/settings.js';
import * as windowHelper from '../helpers/window.js'
import * as screenHelper from '../helpers/screen.js'
import Settings from '../helpers/settings.js';

export default GObject.registerClass(
    class Tiler extends GObject.Object {
        _createdSignal;

        constructor() {
            super()

            this._createdSignal = global.display.connect(
                'window-created',
                this._windowcreated.bind(this)
            );
        }

        tile() {
            let window = global.display.get_focus_window();
            if (!window) {
                return;
            }

            let workspace = window.get_workspace();
            let windows = screenHelper.getWindowSizes(workspace, this._sortWindow)

            let maxCols = Setting.getMaxColumns();
            let maxRows = Settings.getMaxRows();
            let maxWindows = maxCols * maxRows;

            if (windows.length > maxWindows) {
                return;
            }

            let screenSize = screenHelper.getScreenSize(workspace);

            let splitSizes = screenHelper.splitScreenColumns(screenSize, windows.length);
            if (windows.length > maxCols) {
                splitSizes = [];
                let rowSizes = screenHelper.splitScreenRows(screenSize, maxRows);
                for (let rowSize of rowSizes) {
                    let colSplits = screenHelper.splitScreenColumns(rowSize, maxCols);
                    splitSizes = splitSizes.concat(colSplits)
                }
            }

            let windowIndex = 0;

            for (let screenSplit of splitSizes) {
                if (windowIndex >= windows.length) {
                    break;
                }
                windowHelper.resizeWindow(windows[windowIndex++].window, screenSplit)
            }
        }

        _sortWindow(windowA, windowB) {
            return windowA.size.x + windowB.size.x + windowA.size.y - windowB.size.y;
        }

        _windowcreated(_, window) {
            let windowActor = window.get_compositor_private();

            windowActor.remove_all_transitions();

            let signal = windowActor.connect(
                "first-frame",
                ((_) => {
                    this._manageWindow(window);

                    windowActor.disconnect(signal);

                }).bind(this)
            );
        }

        _manageWindow(window) {
            if (!Setting.isMaximizeMode() && !Setting.isUltraWideMode()) {
                return;
            }

            let workspace = window.get_workspace();
            if (workspace.list_windows().length !== 1) {
                return;
            }

            if (Setting.isMaximizeMode() && !Setting.isUltraWideMode()) {
                windowHelper.maximizeWindow(window);
                return;
            }

            let screenSize = screenHelper.getScreenSize(workspace);
            if (!Setting.isMaximizeMode() && Setting.isUltraWideMode()) {
                windowHelper.centerWindow(window, screenSize);
                return;
            }

            if (Setting.isMaximizeMode() && Setting.isUltraWideMode()) {
                let ultraWideSize = screenHelper.splitUltraWide(screenSize);
                windowHelper.resizeWindow(window, ultraWideSize);
                return;
            }
        }

        destroy() {
            global.display.disconnect(this._createdSignal);
        }
    }
);