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

        _growCallbackX;
        _growCallbackY;
        _shrinkCallbackX;
        _shrinkCallbackY;

        constructor() {
            super();

            this._settings = Settings.reference;

            this._setupKeyBinds(Settings.KEY_TILE, () => this._tileCallback?.());
            this._setupKeyBinds(Settings.KEY_SWITCH_RIGHT, () => this._switchCallbackRight?.());
            this._setupKeyBinds(Settings.KEY_SWITCH_LEFT, () => this._switchCallbackLeft?.());
            this._setupKeyBinds(Settings.KEY_SWITCH_UP, () => this._switchCallbackUp?.());
            this._setupKeyBinds(Settings.KEY_SWITCH_DOWN, () => this._switchCallbackDown?.());
            this._setupKeyBinds(Settings.KEY_GROW_X, () => this._growCallbackX?.());
            this._setupKeyBinds(Settings.KEY_GROW_Y, () => this._growCallbackY?.());
            this._setupKeyBinds(Settings.KEY_SHRINK_X, () => this._shrinkCallbackX?.());
            this._setupKeyBinds(Settings.KEY_SHRINK_Y, () => this._shrinkCallbackY?.());
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

        /**
        * @param {Function} value
        */
        set growCallbackX(value) {
            this._growCallbackX = value;
        }
        
        /**
        * @param {Function} value
        */
        set growCallbackY(value) {
            this._growCallbackY = value;
        }

        /**
        * @param {Function} value
        */
        set shrinkCallbackX(value) {
            this._shrinkCallbackX = value;
        }

        /**
        * @param {Function} value
        */
        set shrinkCallbackY(value) {
            this._shrinkCallbackY = value;
        }

        destroy() {
            Main.wm.removeKeybinding(Settings.KEY_TILE);
            Main.wm.removeKeybinding(Settings.KEY_SWITCH_RIGHT);
            Main.wm.removeKeybinding(Settings.KEY_SWITCH_LEFT);
            Main.wm.removeKeybinding(Settings.KEY_SWITCH_UP);
            Main.wm.removeKeybinding(Settings.KEY_SWITCH_DOWN);
            Main.wm.removeKeybinding(Settings.KEY_GROW_X);
            Main.wm.removeKeybinding(Settings.KEY_GROW_Y);
            Main.wm.removeKeybinding(Settings.KEY_SHRINK_X);
            Main.wm.removeKeybinding(Settings.KEY_SHRINK_Y);
        }
    }
);