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
    
        center() {
            let window = windowHelper.getFocusedWindow();
            let workspace = windowHelper.getWorkspace(window);
            let screen = screenHelper.getScreenSize(workspace);
            let windows = windowHelper.getWindowsInWorkspace(workspace, true);

            if (windows.length == 0) {
                return;
            }
            
            let windowSizesX = windows.flatMap(x => [x.size.x, x.size.x + x.size.width]);
            let windowSizesY = windows.flatMap(x => [x.size.y, x.size.y + x.size.height]);

            let windowGrid = this._getWindowGridSize(windowSizesX, windowSizesY);

            let screenCenterX = screen.x + (screen.width / 2);
            let screenCenterY = screen.y + (screen.height / 2);

            let windowCenterX = windowGrid.x + (windowGrid.width / 2);
            let windowCenterY = windowGrid.y + (windowGrid.height / 2);

            let offsetX = screenCenterX - windowCenterX;
            let offsetY = screenCenterY - windowCenterY;

            for (let window of windows) {

                window.size.x += offsetX;
                window.size.y += offsetY;

                windowHelper.resizeWindow(window, window.size);
            }
        }

        _defaultTile(workspace) {
            let screenSize = screenHelper.getScreenSize(workspace);
            let windows = windowHelper.getWindowsInWorkspace(workspace, true);

            windows = windows.sort(this._sortWindow);

            let initialWidth = 0;
            let initialHeight = 0;

            let maxWidth = windows.reduce(
                (sum, currentWindow) => sum + currentWindow.size.width,
                initialWidth,
            );

            let maxHeight = windows.reduce(
                (max, currentWindow) => { return max > currentWindow.size.height ? max : currentWindow.size.height },
                initialHeight,
            );

            let windowX = screenSize.x + (screenSize.width / 2) - (maxWidth / 2);
            let windowY = screenSize.y + (screenSize.height / 2) - (maxHeight / 2);

            if (screenSize.width < maxWidth) {
                return;
            }

            for (let window of windows) {

                window.size.x = windowX;
                window.size.y = windowY;

                windowHelper.resizeWindow(window, window.size);

                windowX += window.size.width;
            }
        }

        _gridTile(workspace) {
            let windows = windowHelper.getWindowsInWorkspace(workspace, true)

            windows = windows.sort(this._sortWindow)

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
                windowHelper.resizeWindow(windows[windowIndex++], screenSplit)
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
        
        _getWindowGridSize(valuesX, valuesY) {
            let sortedValuesX = valuesX.sort((a, b) => a - b);
            let sortedValuesY = valuesY.sort((a, b) => a - b);

            let minX = sortedValuesX[0];
            let maxX = sortedValuesX[valuesX.length - 1];

            let minY = sortedValuesY[0];
            let maxY = sortedValuesY[valuesY.length - 1];

            return {
                x: minX,
                y: minY,
                width: (maxX - minX),
                height: (maxY - minY)
            };
        }

        destroy() {
            global.display.disconnect(this._createdSignal);
        }
    }
);