import GObject from 'gi://GObject';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Meta from 'gi://Meta';
import Shell from 'gi://Shell';

import Settings from '../helpers/settings.js';

export default GObject.registerClass(
    class KeyBinds extends GObject.Object {
        _settings;

        _tileCallback;
        _switchCallbackRight;
        _switchCallbackLeft;
        _switchCallbackUp;
        _switchCallbackDown;

        constructor() {
            super();

            this._settings = Settings.reference;

            this._setupKeyBinds(Settings.KEY_TILE, () => this._tileCallback?.());
            this._setupKeyBinds(Settings.KEY_SWITCH_RIGHT, () => this._switchCallbackRight?.());
            this._setupKeyBinds(Settings.KEY_SWITCH_LEFT, () => this._switchCallbackLeft?.());
            this._setupKeyBinds(Settings.KEY_SWITCH_UP, () => this._switchCallbackUp?.());
            this._setupKeyBinds(Settings.KEY_SWITCH_DOWN, () => this._switchCallbackDown?.());
        }

        _setupKeyBinds(settingKey, callback) {
            Main.wm.addKeybinding(
                settingKey,
                this._settings,
                Meta.KeyBindingFlags.NONE,
                Shell.ActionMode.NORMAL,
                (callback).bind(this)
            );
        }

        /**
         * @param {Function} value
         */
        set tileCallback(value) {
            this._tileCallback = value;
        }

        /**
         * @param {Function} value
         */
        set switchCallbackRight(value) {
            this._switchCallbackRight = value;
        }

        /**
         * @param {Function} value
         */
        set switchCallbackLeft(value) {
            this._switchCallbackLeft = value;
        }

        /**
        * @param {Function} value
        */
        set switchCallbackUp(value) {
            this._switchCallbackUp = value;
        }

        /**
         * @param {Function} value
         */
        set switchCallbackDown(value) {
            this._switchCallbackDown = value;
        }

        destroy() {
            Main.wm.removeKeybinding(Settings.KEY_TILE);
            Main.wm.removeKeybinding(Settings.KEY_SWITCH_RIGHT);
            Main.wm.removeKeybinding(Settings.KEY_SWITCH_LEFT);
            Main.wm.removeKeybinding(Settings.KEY_SWITCH_UP);
            Main.wm.removeKeybinding(Settings.KEY_SWITCH_DOWN);
        }
    }
);