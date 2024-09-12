import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';
import Gdk from 'gi://Gdk';

import KeyMapper from './helpers/keymap.js';
import Settings from './helpers/settings.js';

import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class TilingShellExtensionPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        Settings.initialize(this.getSettings());

        const prefsPage = new Adw.PreferencesPage({
            name: 'general',
            title: 'General',
            iconName: 'dialog-information-symbolic',
        });

        window.add(prefsPage);

        const settingGroup = new Adw.PreferencesGroup({
            title: 'Window Settings',
            description: `Configure window settings.`,
        });
        prefsPage.add(settingGroup);

        const maxmizeSwitch = this._buildSwitchRow(
            Settings.MAXIMIZE_MODE,
            'Maximize mode',
            'Maximize the first opened window.',
        );
        settingGroup.add(maxmizeSwitch);

        const ultraWideSwitch = this._buildSwitchRow(
            Settings.ULTRA_WIDE_MODE,
            'UltraWide mode',
            'Vertically maximize or centers the first window.',
        );
        settingGroup.add(ultraWideSwitch);

        const keepOriginalSizeSwitch = this._buildSwitchRow(
            Settings.ORIGINAL_SIZE_MODE,
            'Original size mode',
            'Keep original window size when windows are switched.',
        );
        settingGroup.add(keepOriginalSizeSwitch);

        const resizeAmountRow = this._buildSpinButtonRow(
            Settings.WINDOW_RESIZE_AMOUNT,
            'Window adjustment',
            'Window adjustment amount',
        );
        settingGroup.add(resizeAmountRow);

        const tileGroup = new Adw.PreferencesGroup({
            title: 'Tiling Settings',
            description: `Configure tiling settings.`,
        });
        prefsPage.add(tileGroup);

        const gridTileSwitch = this._buildSwitchRow(
            Settings.GRID_TILE_MODE,
            'Grid tile mode',
            'Tile windows in grid.',
        );
        tileGroup.add(gridTileSwitch);

        const windowMaxColumn = this._buildSpinButtonRow(
            Settings.WINDOW_MAX_COLUMNS,
            'Max column tiles',
            'Maximum columns of tiled windows.',
        );
        tileGroup.add(windowMaxColumn);

        const windowMaxRow = this._buildSpinButtonRow(
            Settings.WINDOW_MAX_ROWS,
            'Max row tiles',
            'Maximum rows of tiled windows.',
        );
        tileGroup.add(windowMaxRow);

        const keybindingsGroup = new Adw.PreferencesGroup({
            title: 'Key Bindings',
            description: 'Configure keybinds keys.',
        });
        prefsPage.add(keybindingsGroup);

        const tileKeybindingsGroup = new Adw.PreferencesGroup({
            title: 'Tile keybinds',
        });
        keybindingsGroup.add(tileKeybindingsGroup);

        const tilingKey = this._buildShortcutButtonRow(
            Settings.KEY_TILE,
            'Tile windows opened in current workspace.'
        );
        tileKeybindingsGroup.add(tilingKey);


        const focusKeybindingsGroup = new Adw.PreferencesGroup({
            title: 'Focus keybinds',
        });
        keybindingsGroup.add(focusKeybindingsGroup);

        const focusRightKey = this._buildShortcutButtonRow(
            Settings.KEY_FOCUS_RIGHT,
            'Focus right of current window.'
        );
        focusKeybindingsGroup.add(focusRightKey);

        const focusLeftKey = this._buildShortcutButtonRow(
            Settings.KEY_FOCUS_LEFT,
            'Focus left of current window.'
        );
        focusKeybindingsGroup.add(focusLeftKey);

        const focusUpKey = this._buildShortcutButtonRow(
            Settings.KEY_FOCUS_UP,
            'Focus up of current window.'
        );
        focusKeybindingsGroup.add(focusUpKey);

        const focusDownKey = this._buildShortcutButtonRow(
            Settings.KEY_FOCUS_DOWN,
            'Focus down of current window.'
        );
        focusKeybindingsGroup.add(focusDownKey);



        const moveKeybindingsGroup = new Adw.PreferencesGroup({
            title: 'Move keybinds',
        });
        keybindingsGroup.add(moveKeybindingsGroup);

        const moveRightKey = this._buildShortcutButtonRow(
            Settings.KEY_MOVE_RIGHT,
            'Move right the focused window.'
        );
        moveKeybindingsGroup.add(moveRightKey);

        const moveLeftKey = this._buildShortcutButtonRow(
            Settings.KEY_MOVE_LEFT,
            'Move left the focused window.'
        );
        moveKeybindingsGroup.add(moveLeftKey);

        const moveUpKey = this._buildShortcutButtonRow(
            Settings.KEY_MOVE_UP,
            'Move up the focused window.'
        );
        moveKeybindingsGroup.add(moveUpKey);

        const moveDownKey = this._buildShortcutButtonRow(
            Settings.KEY_MOVE_DOWN,
            'Move down the focused window.'
        );
        moveKeybindingsGroup.add(moveDownKey);

        const resizeKeybindingsGroup = new Adw.PreferencesGroup({
            title: 'Resize keybinds',
        });
        keybindingsGroup.add(resizeKeybindingsGroup);

        const resizeLeftKey = this._buildShortcutButtonRow(
            Settings.KEY_GROW_X,
            'Grow focused window in X axis.'
        );
        resizeKeybindingsGroup.add(resizeLeftKey);

        const resizeRightKey = this._buildShortcutButtonRow(
            Settings.KEY_SHRINK_X,
            'Shrink focused window in X axis.'
        );
        resizeKeybindingsGroup.add(resizeRightKey);

        const resizeUpKey = this._buildShortcutButtonRow(
            Settings.KEY_SHRINK_Y,
            'Shrink focused window in Y axis.'
        );
        resizeKeybindingsGroup.add(resizeUpKey);

        const resizeDownKey = this._buildShortcutButtonRow(
            Settings.KEY_GROW_Y,
            'Grow focused window in Y axis'
        );
        resizeKeybindingsGroup.add(resizeDownKey);

        const snapKeybindingsGroup = new Adw.PreferencesGroup({
            title: 'Snap keybinds',
        });
        keybindingsGroup.add(snapKeybindingsGroup);

        const snapRightKey = this._buildShortcutButtonRow(
            Settings.KEY_SNAP_RIGHT,
            'Snap focused window right.'
        );
        snapKeybindingsGroup.add(snapRightKey);

        const snapLeftKey = this._buildShortcutButtonRow(
            Settings.KEY_SNAP_LEFT,
            'Snap focused window left.'
        );
        snapKeybindingsGroup.add(snapLeftKey);

        const snapUpKey = this._buildShortcutButtonRow(
            Settings.KEY_SNAP_UP,
            'Snap focused window up.'
        );
        snapKeybindingsGroup.add(snapUpKey);

        const snapDownKey = this._buildShortcutButtonRow(
            Settings.KEY_SNAP_DOWN,
            'Snap focused window down.'
        );
        snapKeybindingsGroup.add(snapDownKey);

        const switchKeybindingsGroup = new Adw.PreferencesGroup({
            title: 'Switch keybinds',
        });
        keybindingsGroup.add(switchKeybindingsGroup);

        const switchRightKey = this._buildShortcutButtonRow(
            Settings.KEY_SWITCH_RIGHT,
            'Switch current window with right window.'
        );
        switchKeybindingsGroup.add(switchRightKey);

        const switchLeftKey = this._buildShortcutButtonRow(
            Settings.KEY_SWITCH_LEFT,
            'Switch current window with left window.'
        );
        switchKeybindingsGroup.add(switchLeftKey);

        const switchUpKey = this._buildShortcutButtonRow(
            Settings.KEY_SWITCH_UP,
            'Switch current window with up window.'
        );
        switchKeybindingsGroup.add(switchUpKey);

        const switchDownKey = this._buildShortcutButtonRow(
            Settings.KEY_SWITCH_DOWN,
            'Switch current window with down window.'
        );
        switchKeybindingsGroup.add(switchDownKey);

        const footerGroup = new Adw.PreferencesGroup();
        prefsPage.add(footerGroup);

        let githubLink = `<a href="https://github.com/00000vish/vkeybind">GitHub</a>`;
        footerGroup.add(
            new Gtk.Label({
                label: `${this.metadata['name']} v${this.metadata['version']} · ${githubLink}`,
                useMarkup: true,
                margin_bottom: 32,
            }),
        );

        window.searchEnabled = true;
        window.connect('close-request', () => {
            Settings.destroy();
        });
    }

    _buildSwitchRow(settingKey, title, subtitle, suffix) {
        const gtkSwitch = new Gtk.Switch({
            vexpand: false,
            valign: Gtk.Align.CENTER,
        });

        const adwRow = new Adw.ActionRow({
            title,
            subtitle,
            activatableWidget: gtkSwitch,
        });

        if (suffix)
            adwRow.add_suffix(suffix);

        adwRow.add_suffix(gtkSwitch);

        Settings.bind(settingKey, gtkSwitch, 'active');

        return adwRow;
    }

    _buildSpinButtonRow(settingKey, title, subtitle, min = 0, max = 32) {
        const spinBtn = Gtk.SpinButton.new_with_range(min, max, 1);
        spinBtn.set_vexpand(false);
        spinBtn.set_valign(Gtk.Align.CENTER);

        const adwRow = new Adw.ActionRow({
            title,
            subtitle,
            activatableWidget: spinBtn,
        });

        adwRow.add_suffix(spinBtn);

        Settings.bind(settingKey, spinBtn, 'value');

        return adwRow;
    }

    _buildLinkButton(label, uri) {
        const btn = new Gtk.Button({
            label,
            hexpand: false,
        });

        btn.connect('clicked', () => {
            Gtk.show_uri(null, uri, Gdk.CURRENT_TIME);
        });

        return btn;
    }

    _buildShortcutButtonRow(key, title) {
        var shortcut = Settings.getKeyBind(key);

        const btn = new KeyMapper(shortcut);
        btn.set_vexpand(false);
        btn.set_valign(Gtk.Align.CENTER);
        btn.connect('changed', (_, value) => Settings.setKeyBind(key, value.toString()));

        const adwRow = new Adw.ActionRow({
            title,
            activatableWidget: btn,
        });
        adwRow.add_suffix(btn);

        Settings.bind(key, adwRow, 'sensitive');

        return adwRow;
    }
}