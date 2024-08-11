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
            this._keybinds.tileCallback = this._tiler.tile;
            this._keybinds.switchCallbackRight = this._switcher.switchRight;
            this._keybinds.switchCallbackLeft = this._switcher.switchLeft;
            this._keybinds.switchCallbackUp = this._switcher.switchUp;
            this._keybinds.switchCallbackDown = this._switcher.switchDown;
        }

        destroy() {
            this._tiler.destroy();
            this._switcher.destroy();
            this._keybinds.destroy();
        }
    }
);