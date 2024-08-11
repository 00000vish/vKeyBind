import Gio from 'gi://Gio';

export default class Settings {
    static _settings;

    static MAXIMIZE_MODE = 'maximize-mode';
    static ULTRA_WIDE_MODE = 'ultra-wide-mode';
    static WINDOW_GAP = 'window-tile-gap';

    static KEY_TILE = "tile-hotkey";
    static KEY_MOVE_RIGHT = "move-right-hotkey";
    static KEY_MOVE_LEFT = "move-left-hotkey";
    static KEY_MOVE_UP = "move-up-hotkey";
    static KEY_MOVE_DOWN = "move-down-hotkey";

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