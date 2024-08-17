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

                let closeness = vertical ? windowSize.y + otherWindow.size.y : windowSize.x + otherWindow.size.x;

                calculatedwindows.push({
                    window: otherWindow,
                    range: closeness + (max - min)
                });
            }

            calculatedwindows = calculatedwindows.sort((a, b) => a.range - b.range);

            return calculatedwindows.map(x => x.window);
        }

        _getCurrentWindowSizes(vertical) {
            let window = windowHelper.getFocusedWindow();
            let workspace = windowHelper.getWorkspace(window);

            let allWindowSizes = screenHelper.getWindowSizes(workspace, false);

            let filteredWindowSizes = this._filterWindows(window, allWindowSizes, vertical);
            if (filteredWindowSizes.length <= 1) {
                filteredWindowSizes = allWindowSizes;
            }

            let sortedWindowSizes = this._sortWindows(window, filteredWindowSizes, vertical);

            let currentIndex = sortedWindowSizes.findIndex(x => x.window === window);

            return [currentIndex, sortedWindowSizes];
        }

        _switch(shiftIndex, vertical) {
            let [index, windowSizes] = this._getCurrentWindowSizes(vertical);

            index = (windowSizes.length + index + shiftIndex) % windowSizes.length;

            windowHelper.focusWindow(windowSizes[index].window);
        }

        destroy() { }
    }
);