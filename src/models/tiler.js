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
            let window = windowHelper.getFocusedWindow();
            if (!window) {
                return;
            }

            let workspace = windowHelper.getWorkspace(window);

            if (Settings.isGridTileMode()) {
                this._gridTile(workspace);
            } else {
                this._defaultTile(workspace);
            }
        }

        _defaultTile(workspace) {
            let screenSize = screenHelper.getScreenSize(workspace);
            let windowSizes = windowHelper.getWindowSizes(workspace, true)

            windowSizes = windowSizes.sort(this._sortWindow)

            let initialWidth = 0;
            let initialHeight = 0;

            let maxWidth = windowSizes.reduce(
                (sum, currentWindow) => sum + currentWindow.size.width,
                initialWidth,
            );

            let maxHeight = windowSizes.reduce(
                (max, currentWindow) => { return max > currentWindow.size.height ? max : currentWindow.size.height },
                initialHeight,
            );

            let windowX = screenSize.x + (screenSize.width / 2) - (maxWidth / 2);
            let windowY = screenSize.y + (screenSize.height / 2) - (maxHeight / 2);

            if (screenSize.width < maxWidth) {
                return;
            }

            for (let item of windowSizes) {

                item.size.x = windowX;
                item.size.y = windowY;

                windowHelper.resizeWindow(item.window, item.size);

                windowX += item.size.width;
            }
        }

        _gridTile(workspace) {
            let windowSizes = windowHelper.getWindowSizes(workspace, true)

            windowSizes = windowSizes.sort(this._sortWindow)

            let maxCols = Setting.getMaxColumns();
            let maxRows = Settings.getMaxRows();
            let maxWindows = maxCols * maxRows;

            if (windowSizes.length > maxWindows) {
                return;
            }

            let screenSize = screenHelper.getScreenSize(workspace);

            let splitSizes = screenHelper.splitScreenColumns(screenSize, windowSizes.length);
            if (windowSizes.length > maxCols) {
                splitSizes = [];
                let rowSizes = screenHelper.splitScreenRows(screenSize, maxRows);
                for (let rowSize of rowSizes) {
                    let colSplits = screenHelper.splitScreenColumns(rowSize, maxCols);
                    splitSizes = splitSizes.concat(colSplits)
                }
            }

            let windowIndex = 0;

            for (let screenSplit of splitSizes) {
                if (windowIndex >= windowSizes.length) {
                    break;
                }
                windowHelper.resizeWindow(windowSizes[windowIndex++].window, screenSplit)
            }
        }

        _sortWindow(windowA, windowB) {
            return (windowA.size.y - windowB.size.y) + (windowA.size.x - windowB.size.x);
        }

        _windowcreated(_, window) {
            windowHelper.invokeOnWinowReady(window, this._manageWindow);
        }

        _manageWindow(window) {
            if (!Setting.isMaximizeMode() && !Setting.isUltraWideMode()) {
                return;
            }

            let workspace = windowHelper.getWorkspace(window);
            if (windowHelper.getWindowsInWorkspace(workspace, true).length !== 1) {
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