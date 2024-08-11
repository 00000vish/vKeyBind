import Gio from 'gi://Gio';

export default class Settings {
    static _settings;

    static MAXIMIZE_MODE = 'maximize-mode';
    static ULTRA_WIDE_MODE = 'ultra-wide-mode';
    static WINDOW_GAP = 'window-tile-gap';

    static KEY_TILE = "tile-hotkey";
    static KEY_SWITCH_RIGHT = "switch-right-hotkey";
    static KEY_SWITCH_LEFT = "switch-left-hotkey";
    static KEY_SWITCH_UP = "switch-up-hotkey";
    static KEY_SWITCH_DOWN = "switch-down-hotkey";

    static initialize(settings) {
        this._settings = settings;
    }

    static isMaximizeMode() {
        if (!this._settings) 
            return true;

        return this._settings.get_boolean(this.MAXIMIZE_MODE);
    }

    static isUltraWideMode() {
        if (!this._settings) 
            return false;

        return this._settings.get_boolean(this.ULTRA_WIDE_MODE);
    }

    static bind(key, object, property, flags) {
        this._settings?.bind(key, object, property, flags);
    }

    static get reference() {
        return this._settings;
    }
}