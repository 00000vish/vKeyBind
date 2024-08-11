import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

import Gtile from './gtile.js'
import Settings from './helpers/settings.js';

export default class GtileExtension extends Extension {
    _indicator;
    _gtile;

    _initialize() {
        Settings.initialize(this.getSettings());
    }

    _createGtile() {
        this._gtile = new Gtile();
    }

    enable() {
        this._initialize();
        this._createGtile();
    }

    disable() {
        this._gtile?.destroy();
        this._gtile = null;
    }
}
