export default class Settings {
    static _settings;

    static MAXIMIZE_MODE = 'maximize-mode';
    static ULTRA_WIDE_MODE = 'ultra-wide-mode';
    static GRID_TILE_MODE = 'grid-tile-mode';
    static ORIGINAL_SIZE_MODE = "original-size-mode";

    static WINDOW_RESIZE_AMOUNT = 'window-resize-amount';
    static WINDOW_MAX_COLUMNS = 'window-max-column-tiles';
    static WINDOW_MAX_ROWS = 'window-max-row-tiles';

    static KEY_TILE = "tile-hotkey";
    static KEY_SWITCH_RIGHT = "switch-right-hotkey";
    static KEY_SWITCH_LEFT = "switch-left-hotkey";
    static KEY_SWITCH_UP = "switch-up-hotkey";
    static KEY_SWITCH_DOWN = "switch-down-hotkey";
    static KEY_SNAP_RIGHT = "snap-right-hotkey";
    static KEY_SNAP_LEFT = "snap-left-hotkey";
    static KEY_SNAP_UP = "snap-up-hotkey";
    static KEY_SNAP_DOWN = "snap-down-hotkey";
    static KEY_MOVE_RIGHT = "move-right-hotkey";
    static KEY_MOVE_LEFT = "move-left-hotkey";
    static KEY_MOVE_UP = "move-up-hotkey";
    static KEY_MOVE_DOWN = "move-down-hotkey";
    static KEY_SHRINK_X = "shrink-x-hotkey";
    static KEY_SHRINK_Y = "shrink-y-hotkey";
    static KEY_GROW_X = "grow-x-hotkey";
    static KEY_GROW_Y = "grow-y-hotkey";
    static KEY_FOCUS_RIGHT = "focus-right-hotkey";
    static KEY_FOCUS_LEFT = "focus-left-hotkey";
    static KEY_FOCUS_UP = "focus-up-hotkey";
    static KEY_FOCUS_DOWN = "focus-down-hotkey";


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

    static isKeepOriginalSize() {
        if (!this._settings)
            return true;

        return this._settings.get_boolean(this.ORIGINAL_SIZE_MODE);
    }

    static getResizeAmount() {
        if (!this._settings)
            return 4;

        return this._settings?.get_uint(this.WINDOW_RESIZE_AMOUNT);
    }

    static getMaxColumns() {
        if (!this._settings)
            return 4;

        return this._settings?.get_uint(this.WINDOW_MAX_COLUMNS);
    }

    static getMaxRows() {
        if (!this._settings)
            return 2;

        return this._settings?.get_uint(this.WINDOW_MAX_ROWS);
    }

    static getKeyBind(key) {
        return (this._settings?.get_strv(key)[0] ?? '');
    }

    static setKeyBind(key, keybind) {
        return (this._settings?.set_strv(key, [keybind]) ?? false);
    }

    static bind(key, object, property, flags) {
        this._settings?.bind(key, object, property, flags);
    }

    static get reference() {
        return this._settings;
    }
}