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

        _focusCallbackRight;
        _focusCallbackLeft;
        _focusCallbackUp;
        _focusCallbackDown;

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
            this._setupKeyBinds(Settings.KEY_FOCUS_RIGHT, () => this._focusCallbackRight?.());
            this._setupKeyBinds(Settings.KEY_FOCUS_LEFT, () => this._focusCallbackLeft?.());
            this._setupKeyBinds(Settings.KEY_FOCUS_UP, () => this._focusCallbackUp?.());
            this._setupKeyBinds(Settings.KEY_FOCUS_DOWN, () => this._focusCallbackDown?.());
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


        registerKeybind(settingKey, callback) {
            switch (settingKey) {
                case Settings.KEY_TILE: this._tileCallback = callback; break;
                case Settings.KEY_SWITCH_RIGHT: this._switchCallbackRight = callback; break;
                case Settings.KEY_SWITCH_LEFT: this._switchCallbackLeft = callback; break;
                case Settings.KEY_SWITCH_UP: this._switchCallbackUp = callback; break;
                case Settings.KEY_SWITCH_DOWN: this._switchCallbackDown = callback; break;
                case Settings.KEY_GROW_X: this._growCallbackX = callback; break;
                case Settings.KEY_GROW_Y: this._growCallbackY = callback; break;
                case Settings.KEY_SHRINK_X: this._shrinkCallbackX = callback; break;
                case Settings.KEY_SHRINK_Y: this._shrinkCallbackY = callback; break;
                case Settings.KEY_FOCUS_RIGHT: this._focusCallbackRight = callback; break;
                case Settings.KEY_FOCUS_LEFT: this._focusCallbackLeft = callback; break;
                case Settings.KEY_FOCUS_UP: this._focusCallbackUp = callback; break;
                case Settings.KEY_FOCUS_DOWN: this._focusCallbackDown = callback; break;
                default: return;
            }
        }


        destroy() {
            Main.wm.removeKeybinding(Settings.KEY_TILE);
            Main.wm.removeKeybinding(Settings.KEY_FOCUS_RIGHT);
            Main.wm.removeKeybinding(Settings.KEY_FOCUS_LEFT);
            Main.wm.removeKeybinding(Settings.KEY_FOCUS_UP);
            Main.wm.removeKeybinding(Settings.KEY_FOCUS_DOWN);
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