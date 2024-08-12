import GObject from 'gi://GObject';
import Setting from '../helpers/settings.js';
import * as windowHelper from '../helpers/window.js'
import * as screenHelper from '../helpers/screen.js'
import logger from '../helpers/logger.js';

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
            let windows = workspace.list_windows();
            let screenSize = screenHelper.getScreenSize(workspace);
            let screenSplits = getSizeColumn(screenSize, windows.length);

            logger("TODO: tile");
        }

        _windowcreated(_, window) {
            logger("Window opened.");

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
            logger("Managing window.");

            try {
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

            } catch (error) {
                logger(error.toString());
                logger(error.stack);
            }
        }

        destroy() {
            global.display.disconnect(this._createdSignal);
        }
    }
);