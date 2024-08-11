import GObject from 'gi://GObject';
import Setting from './helpers/settings.js';

export default GObject.registerClass(
    class Gtile extends GObject.Object {
        _createdSignal;
        _focusedSignal;

        constructor() {
            super()

            this._createdSignal = global.display.connect('window-created', this._windowcreated.bind(this));
            // this._focusedSignal = global.display.connect('notify::focus-window', this._onWindowFocusChanged.bind(this));
        }

        _windowcreated(_, window) {
            try {
                if (!Setting.isMaximizeMode()) {
                    return;
                }

                let maximizeMode
                let workspace = window.get_workspace();



            } catch (error) {
                logger(error.toString());
                logger(error.stack);
            }
        }
    }

);