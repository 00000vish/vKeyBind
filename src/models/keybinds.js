import GObject from 'gi://GObject';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Meta from 'gi://Meta';
import Shell from 'gi://Shell';

import logger from '../helpers/logger.js';
import Settings from '../helpers/settings.js';

export default GObject.registerClass(
    class KeyBinds extends GObject.Object {
        _settings;

        constructor() {
            super();

            this._settings = Settings.reference;
        }

        _setupKeyBinds(settingKey, callback) {

            var tryCallback = () => {
                try{
                    callback();
                }catch(error){
                    logger(error.message);
                    logger(error.stack);
                }
            }

            Main.wm.addKeybinding(
                settingKey,
                this._settings,
                Meta.KeyBindingFlags.NONE,
                Shell.ActionMode.NORMAL,
                (tryCallback).bind(this)
            );
        }


        registerKeybind(settingKey, callback) {
            switch (settingKey) {
                case Settings.KEY_TILE: this._setupKeyBinds(Settings.KEY_TILE, callback); break;
                case Settings.KEY_SWITCH_RIGHT: this._setupKeyBinds(Settings.KEY_SWITCH_RIGHT, callback); break;
                case Settings.KEY_SWITCH_LEFT: this._setupKeyBinds(Settings.KEY_SWITCH_LEFT, callback); break;
                case Settings.KEY_SWITCH_UP: this._setupKeyBinds(Settings.KEY_SWITCH_UP, callback); break;
                case Settings.KEY_SWITCH_DOWN: this._setupKeyBinds(Settings.KEY_SWITCH_DOWN, callback); break;
                case Settings.KEY_GROW_X: this._setupKeyBinds(Settings.KEY_GROW_X, callback); break;
                case Settings.KEY_GROW_Y: this._setupKeyBinds(Settings.KEY_GROW_Y, callback); break;
                case Settings.KEY_SHRINK_X: this._setupKeyBinds(Settings.KEY_SHRINK_X, callback); break;
                case Settings.KEY_SHRINK_Y: this._setupKeyBinds(Settings.KEY_SHRINK_Y, callback); break;
                case Settings.KEY_FOCUS_RIGHT: this._setupKeyBinds(Settings.KEY_FOCUS_RIGHT, callback); break;
                case Settings.KEY_FOCUS_LEFT: this._setupKeyBinds(Settings.KEY_FOCUS_LEFT, callback); break;
                case Settings.KEY_FOCUS_UP: this._setupKeyBinds(Settings.KEY_FOCUS_UP, callback); break;
                case Settings.KEY_FOCUS_DOWN: this._setupKeyBinds(Settings.KEY_FOCUS_DOWN, callback); break;
                case Settings.KEY_MOVE_RIGHT: this._setupKeyBinds(Settings.KEY_MOVE_RIGHT, callback); break;
                case Settings.KEY_MOVE_LEFT: this._setupKeyBinds(Settings.KEY_MOVE_LEFT, callback); break;
                case Settings.KEY_MOVE_UP: this._setupKeyBinds(Settings.KEY_MOVE_UP, callback); break;
                case Settings.KEY_MOVE_DOWN: this._setupKeyBinds(Settings.KEY_MOVE_DOWN, callback); break;
                case Settings.KEY_SNAP_RIGHT: this._setupKeyBinds(Settings.KEY_SNAP_RIGHT, callback); break;
                case Settings.KEY_SNAP_LEFT: this._setupKeyBinds(Settings.KEY_SNAP_LEFT, callback); break;
                case Settings.KEY_SNAP_UP: this._setupKeyBinds(Settings.KEY_SNAP_UP, callback); break;
                case Settings.KEY_SNAP_DOWN: this._setupKeyBinds(Settings.KEY_SNAP_DOWN, callback); break;
                default: return;
            }
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
            Main.wm.removeKeybinding(Settings.KEY_FOCUS_RIGHT);
            Main.wm.removeKeybinding(Settings.KEY_FOCUS_LEFT);
            Main.wm.removeKeybinding(Settings.KEY_FOCUS_UP);
            Main.wm.removeKeybinding(Settings.KEY_FOCUS_DOWN);
            Main.wm.removeKeybinding(Settings.KEY_MOVE_RIGHT);
            Main.wm.removeKeybinding(Settings.KEY_MOVE_LEFT);
            Main.wm.removeKeybinding(Settings.KEY_MOVE_UP);
            Main.wm.removeKeybinding(Settings.KEY_MOVE_DOWN);
            Main.wm.removeKeybinding(Settings.KEY_SNAP_RIGHT);
            Main.wm.removeKeybinding(Settings.KEY_SNAP_LEFT);
            Main.wm.removeKeybinding(Settings.KEY_SNAP_UP);
            Main.wm.removeKeybinding(Settings.KEY_SNAP_DOWN);
        }
    }
);