import GObject from 'gi://GObject';
import Tiler from './models/tiler.js'
import Switcher from './models/switcher.js'
import KeyBinds from './models/keybinds.js';
import Resizer from './models/resizer.js';
import Mover from './models/mover.js';
import Focuser from './models/focuser.js'
import Settings from './helpers/settings.js';
import Snapper from './models/snapper.js';

export default GObject.registerClass(
    class vKeyBind extends GObject.Object {
        _tiler;
        _resizer;
        _focuser;
        _switcher;
        _mover;
        _snapper;

        _keybinds;

        constructor() {
            super()

            this._tiler = new Tiler();
            this._resizer = new Resizer();
            this._switcher = new Switcher();
            this._focuser = new Focuser();
            this._mover = new Mover();
            this._snapper = new Snapper();
            this._keybinds = new KeyBinds();

            this._keybinds.registerKeybind(Settings.KEY_TILE, (this._tiler.tile).bind(this._tiler));

            this._keybinds.registerKeybind(Settings.KEY_FOCUS_RIGHT, (this._focuser.focusRight).bind(this._focuser));
            this._keybinds.registerKeybind(Settings.KEY_FOCUS_LEFT, (this._focuser.focusLeft).bind(this._focuser));
            this._keybinds.registerKeybind(Settings.KEY_FOCUS_UP, (this._focuser.focusUp).bind(this._focuser));
            this._keybinds.registerKeybind(Settings.KEY_FOCUS_DOWN, (this._focuser.focusDown).bind(this._focuser));

            this._keybinds.registerKeybind(Settings.KEY_SWITCH_RIGHT, (this._switcher.switchRight).bind(this._switcher));
            this._keybinds.registerKeybind(Settings.KEY_SWITCH_LEFT, (this._switcher.switchLeft).bind(this._switcher));
            this._keybinds.registerKeybind(Settings.KEY_SWITCH_UP, (this._switcher.switchUp).bind(this._switcher));
            this._keybinds.registerKeybind(Settings.KEY_SWITCH_DOWN, (this._switcher.switchDown).bind(this._switcher));

            this._keybinds.registerKeybind(Settings.KEY_SNAP_RIGHT, (this._snapper.snapRight).bind(this._snapper));
            this._keybinds.registerKeybind(Settings.KEY_SNAP_LEFT, (this._snapper.snapLeft).bind(this._snapper));
            this._keybinds.registerKeybind(Settings.KEY_SNAP_UP, (this._snapper.snapUp).bind(this._snapper));
            this._keybinds.registerKeybind(Settings.KEY_SNAP_DOWN, (this._snapper.snapDown).bind(this._snapper));

            this._keybinds.registerKeybind(Settings.KEY_GROW_X, (this._resizer.growX).bind(this._resizer));
            this._keybinds.registerKeybind(Settings.KEY_GROW_Y, (this._resizer.growY).bind(this._resizer));
            this._keybinds.registerKeybind(Settings.KEY_SHRINK_X, (this._resizer.shrinkX).bind(this._resizer));
            this._keybinds.registerKeybind(Settings.KEY_SHRINK_Y, (this._resizer.shrinkY).bind(this._resizer));

            this._keybinds.registerKeybind(Settings.KEY_MOVE_RIGHT, (this._mover.moveRight).bind(this._mover));
            this._keybinds.registerKeybind(Settings.KEY_MOVE_LEFT, (this._mover.moveLeft).bind(this._mover));
            this._keybinds.registerKeybind(Settings.KEY_MOVE_UP, (this._mover.moveUp).bind(this._mover));
            this._keybinds.registerKeybind(Settings.KEY_MOVE_DOWN, (this._mover.moveDown).bind(this._mover));
        }

        destroy() {
            this._keybinds.destroy();

            this._tiler.destroy();
            this._resizer.destroy();
            this._switcher.destroy();
            this._focuser.destroy();
            this._snapper.destroy();
            this._mover.destroy();
        }
    }
);