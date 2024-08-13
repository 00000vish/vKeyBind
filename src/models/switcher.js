import GObject from 'gi://GObject';
import * as windowHelper from '../helpers/window.js'
import * as screenHelper from '../helpers/screen.js'
import logger from '../helpers/logger.js';

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
            if (vertical) {
                return windowA.size.y - windowB.size.y;
            } else {
                return windowA.size.x - windowB.size.x;
            }
        }

        _getCurrentWindowSizes(vertical) {
            let window = global.display.get_focus_window();
            let workspace = window.get_workspace();

            let sortCallback = this._sortWindow.bind(vertical)
            let windowSizes = screenHelper.getWindowSizes(workspace, sortCallback);

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