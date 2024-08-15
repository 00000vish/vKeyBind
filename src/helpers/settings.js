export default class Settings {
    static _settings;

    static MAXIMIZE_MODE = 'maximize-mode';
    static ULTRA_WIDE_MODE = 'ultra-wide-mode';
    static GRID_TILE_MODE = 'grid-tile-mode';

    static WINDOW_MAX_COLUMNS = 'window-max-column-tiles';
    static WINDOW_MAX_ROWS = 'window-max-row-tiles';

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

    static isGridTileMode() {
        if (!this._settings)
            return false;

        return this._settings.get_boolean(this.GRID_TILE_MODE);
    }

    static getMaxColumns(){
        if (!this._settings)
            return 4;

        return this._settings?.get_uint(this.WINDOW_MAX_COLUMNS);
    }

    static getMaxRows(){
        if (!this._settings)
            return 2;

        return this._settings?.get_uint(this.WINDOW_MAX_ROWS);
    }

    static bind(key, object, property, flags) {
        this._settings?.bind(key, object, property, flags);
    }

    static get reference() {
        return this._settings;
    }
}