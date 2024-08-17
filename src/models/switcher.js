import GObject from 'gi://GObject';
import * as windowHelper from '../helpers/window.js'
import * as screenHelper from '../helpers/screen.js'

export default GObject.registerClass(
    class Switcher extends GObject.Object {

        constructor() {
            super()
        }

        switchRight() {
            this._switch(1, false);
        }

        switchLeft() {
            this._switch(-1, false);
        }

        switchUp() {
            this._switch(-1, true);
        }

        switchDown() {
            this._switch(1, true);
        }

        _filterWindows(window, windows, vertical) {
            let filterCallback = (otherWindowSize) => {
                let otherMin = vertical ? otherWindowSize.size.x : otherWindowSize.size.y;
                let otherMax = vertical ? otherWindowSize.size.x + otherWindowSize.size.width : otherWindowSize.size.y + otherWindowSize.size.height;

                let currentWindowSize = windowHelper.getWindowSize(window);

                let min = vertical ? currentWindowSize.x : currentWindowSize.y;
                let max = vertical ? currentWindowSize.x + currentWindowSize.width : currentWindowSize.y + currentWindowSize.height;

                return min < otherMax && max > otherMin;
            }

            return windows.filter(filterCallback);
        }

        _sortWindows(window, windows, vertical) {
            let windowSize = windowHelper.getWindowSize(window);

            let calculatedwindows = [];
            for (let otherWindow of windows) {
                let min = vertical
                    ? (otherWindow.size.x > windowSize.x ? otherWindow.size.x : windowSize.x)
                    : (otherWindow.size.y > windowSize.y ? otherWindow.size.y : windowSize.y);

                let max = vertical
                    ? (otherWindow.size.x + otherWindow.size.width < windowSize.x + windowSize.width
                        ? otherWindow.size.x + otherWindow.size.width
                        : windowSize.x + windowSize.width)
                    : (otherWindow.size.y + otherWindow.size.height < windowSize.y + windowSize.height
                        ? otherWindow.size.y + otherWindow.size.height
                        : windowSize.y + windowSize.height);

                calculatedwindows.push({
                    window: otherWindow,
                    range: max - min
                });
            }

            calculatedwindows = calculatedwindows.sort((a, b) => a.range - b.range);

            return calculatedwindows.map(x => x.window);
        }

        _getCurrentWindowSizes(vertical) {
            let window = windowHelper.getFocusedWindow();
            let workspace = windowHelper.getWorkspace(window);

            let windowSizes = screenHelper.getWindowSizes(workspace, false);

            windowSizes = this._filterWindows(window, windowSizes, vertical);
            windowSizes = this._sortWindows(window, windowSizes, vertical);

            let currentIndex = windowSizes.findIndex(x => x.window === window);

            return [currentIndex, windowSizes];
        }

        _switch(shiftIndex, vertical) {
            let [index, windowSizes] = this._getCurrentWindowSizes(vertical);

            index = (windowSizes.length + index + shiftIndex) % windowSizes.length;

            windowHelper.focusWindow(windowSizes[index].window);
        }

        destroy() { }
    }
);