import GObject from 'gi://GObject';
import Tiler from './models/tiler.js'
import Switcher from './models/switcher.js'
import KeyBinds from './models/keybinds.js';
import Resizer from './models/resizer.js';

export default GObject.registerClass(
    class Gtile extends GObject.Object {
        _tiler;
        _resizer;
        _switcher;

        _keybinds;

        constructor() {
            super()

            this._tiler = new Tiler();
            this._resizer = new Resizer();
            this._switcher = new Switcher();

            this._keybinds = new KeyBinds();
            this._keybinds.tileCallback = (this._tiler.tile).bind(this._tiler);
            this._keybinds.switchCallbackRight = (this._switcher.switchRight).bind(this._switcher);
            this._keybinds.switchCallbackLeft = (this._switcher.switchLeft).bind(this._switcher);
            this._keybinds.switchCallbackUp = (this._switcher.switchUp).bind(this._switcher);
            this._keybinds.switchCallbackDown = (this._switcher.switchDown).bind(this._switcher);
            this._keybinds.growCallbackX = (this._resizer.growX).bind(this._resizer);
            this._keybinds.growCallbackY = (this._resizer.growY).bind(this._resizer);
            this._keybinds.shrinkCallbackX = (this._resizer.shrinkX).bind(this._resizer);
            this._keybinds.shrinkCallbackY = (this._resizer.shrinkY).bind(this._resizer);
        }

        destroy() {
            this._keybinds.destroy();

            this._tiler.destroy();
            this._resizer.destroy();
            this._switcher.destroy();
        }
    }
);