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
            this._switch(1, true);
        }

        switchDown() {
            this._switch(-1, true);
        }

        _sortWindow(windowA, windowB, vertical) {
            let aOffsetY = windowA.size.height;
            let aOffsetX = windowA.size.width;

            let bOffsetY = windowB.size.height;
            let bOffsetX = windowB.size.width;

            if (vertical) {
                return (windowA.size.y + aOffsetY) - (windowB.size.y + bOffsetY);
            } else {
                return (windowA.size.x + aOffsetX) - (windowB.size.x + bOffsetX);
            }
        }

        _getCurrentWindowSizes(vertical) {
            let window = windowHelper.getFocusedWindow();
            let workspace = windowHelper.getWorkspace(window);

            let sortCallback = (windowA, windowB) => this._sortWindow(windowA, windowB, vertical)
            let windowSizes = screenHelper.getWindowSizes(workspace, false, sortCallback);

            let currentIndex = windowSizes.findIndex(x => x.window === window);

            return [currentIndex, windowSizes];
        }

        _switch(shiftIndex, vertical) {
            let [index, windowSizes] = this._getCurrentWindowSizes(vertical, shiftIndex > 0);

            index = (windowSizes.length + index + shiftIndex) % windowSizes.length;

            windowHelper.focusWindow(windowSizes[index].window);
        }

        destroy() { }
    }
);