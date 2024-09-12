import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

import vKeyBind from './vkeybind.js'
import Settings from './helpers/settings.js';

export default class GtileExtension extends Extension {
    _indicator;
    _vKeyBind;

    enable() {
        Settings.initialize(this.getSettings());
        this._vkeyBind = new vKeyBind();
    }

    disable() {
        Settings.destroy();
        this._vKeyBind?.destroy();
        this._vkeyBind = null;
    }
}
