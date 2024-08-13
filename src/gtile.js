import GObject from 'gi://GObject';
import Tiler from './models/tiler.js'
import Switcher from './models/switcher.js'
import KeyBinds from './models/keybinds.js';

export default GObject.registerClass(
    class Gtile extends GObject.Object {
        _tiler;
        _switcher;

        _keybinds;

        constructor() {
            super()

            this._tiler = new Tiler();
            this._switcher = new Switcher();

            this._keybinds = new KeyBinds();
            this._keybinds.tileCallback = (this._tiler.tile).bind(this._tiler);
            this._keybinds.switchCallbackRight = (this._switcher.switchRight).bind(this._switcher);
            this._keybinds.switchCallbackLeft = (this._switcher.switchLeft).bind(this._switcher);
            this._keybinds.switchCallbackUp = (this._switcher.switchUp).bind(this._switcher);
            this._keybinds.switchCallbackDown = (this._switcher.switchDown).bind(this._switcher);
        }

        destroy() {
            this._tiler.destroy();
            this._switcher.destroy();
            this._keybinds.destroy();
        }
    }
);