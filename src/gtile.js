import GObject from 'gi://GObject';
import Tiler from './models/tiler.js'
import Switcher from './models/switcher.js'
import KeyBinds from './models/keybinds.js';
import Resizer from './models/resizer.js';
import Focuser from './models/focuser.js'
import Settings from './helpers/settings.js';

export default GObject.registerClass(
    class Gtile extends GObject.Object {
        _tiler;
        _resizer;
        _focuser;
        _switcher;

        _keybinds;

        constructor() {
            super()

            this._tiler = new Tiler();
            this._resizer = new Resizer();
            this._switcher = new Switcher();
            this._focuser = new Focuser();
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

            this._keybinds.registerKeybind(Settings.KEY_GROW_X, (this._resizer.growX).bind(this._resizer));
            this._keybinds.registerKeybind(Settings.KEY_GROW_Y, (this._resizer.growY).bind(this._resizer));
            this._keybinds.registerKeybind(Settings.KEY_SHRINK_X, (this._resizer.shrinkX).bind(this._resizer));
            this._keybinds.registerKeybind(Settings.KEY_SHRINK_Y, (this._resizer.shrinkY).bind(this._resizer));
        }

        destroy() {
            this._keybinds.destroy();

            this._tiler.destroy();
            this._resizer.destroy();
            this._switcher.destroy();
            this._focuser.destroy();
        }
    }
);