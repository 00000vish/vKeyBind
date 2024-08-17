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

        _sortWindow(windowA, windowB) {
            let windowAreaA = windowA.size.height * windowA.size.width;
            let windowAreaB = windowB.size.height * windowB.size.width;

            return windowAreaA - windowAreaB;
        }

        _filterWindow(currentWindow, otherWindowSize, vertical) {
            let otherMin = vertical ? otherWindowSize.size.x : otherWindowSize.size.y;
            let otherMax = vertical ? otherWindowSize.size.x + otherWindowSize.size.width : otherWindowSize.size.y + otherWindowSize.size.height;

            let currentWindowSize = windowHelper.getWindowSize(currentWindow);

            let min = vertical ? currentWindowSize.x : currentWindowSize.y;
            let max = vertical ? currentWindowSize.x + currentWindowSize.width : currentWindowSize.y + currentWindowSize.height;

            return min < otherMax && max > otherMin;
        }

        _getCurrentWindowSizes(vertical) {
            let window = windowHelper.getFocusedWindow();
            let workspace = windowHelper.getWorkspace(window);

            let windowSizes = screenHelper.getWindowSizes(workspace, false);

            let sortCallback = (windowA, windowB) => this._sortWindow(windowA, windowB)
            let filterCallback = (otherWindow) => this._filterWindow(window, otherWindow, vertical)

            windowSizes = windowSizes.filter(filterCallback);
            windowSizes = windowSizes.sort(sortCallback);

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