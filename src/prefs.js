import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';
import Gdk from 'gi://Gdk';
import GObject from 'gi://GObject';

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

        const windowAdjustRow = this._buildSpinButtonRow(
            Settings.WINDOW_ADJUST_AMOUNT,
            'Window adjustment',
            'Window adjustment amount',
        );
        settingGroup.add(windowAdjustRow);

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
            headerSuffix: new Gtk.Button({
                label: "Reset",
                hexpand: false,
                vexpand: false,
            }),
        });
        prefsPage.add(keybindingsGroup);

        keybindingsGroup.headerSuffix.connect('clicked', () => {
            Settings.resetKeyBinds();
            window.close();
        });

        const tileKeybindingsGroup = new Adw.PreferencesGroup({
            title: 'Tile keybinds',
        });
        keybindingsGroup.add(tileKeybindingsGroup);

        const tilingKey = this._buildShortcutButtonRow(
            Settings.KEY_TILE,
            'Tile windows opened in current workspace.'
        );
        tileKeybindingsGroup.add(tilingKey);

        const centeringKey = this._buildShortcutButtonRow(
            Settings.KEY_CENTER,
            'Center windows opened in current workspace.'
        );
        tileKeybindingsGroup.add(centeringKey);

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

const KeyMapper = GObject.registerClass(
    {
        Properties: {
            shortcut: GObject.ParamSpec.string(
                'shortcut',
                'shortcut',
                'The shortcut',
                GObject.ParamFlags.READWRITE,
                '',
            ),
        },
        Signals: {
            changed: { param_types: [GObject.TYPE_STRING] },
        },
    },
    class KeyMapper extends Gtk.Button {
        _editor;
        _label;
        shortcut;

        constructor(value) {
            super({
                halign: Gtk.Align.CENTER,
                hexpand: false,
                vexpand: false,
                has_frame: false,
            });

            this._editor = null;
            this._label = new Gtk.ShortcutLabel({
                disabled_text: 'New accelerator…',
                valign: Gtk.Align.CENTER,
                hexpand: false,
                vexpand: false,
            });

            this.set_child(this._label);

            // Bind signals
            this.connect('clicked', this._onActivated.bind(this));
            this.shortcut = value;
            this._label.set_accelerator(this.shortcut);
            this.bind_property(
                'shortcut',
                this._label,
                'accelerator',
                GObject.BindingFlags.DEFAULT,
            );
        }

        _onActivated(widget) {
            const ctl = new Gtk.EventControllerKey();

            const content = new Adw.StatusPage({
                title: 'New accelerator…',
                icon_name: 'preferences-desktop-keyboard-shortcuts-symbolic',
            });

            this._editor = new Adw.Window({
                modal: true,
                hide_on_close: true,
                transient_for: widget.get_root(),
                width_request: 480,
                height_request: 320,
                content,
            });

            this._editor.add_controller(ctl);
            ctl.connect('key-pressed', this._onKeyPressed.bind(this));
            this._editor.present();
        }

        _onKeyPressed(_widget, keyval, keycode, state) {

            let mask = state & Gtk.accelerator_get_default_mod_mask();
            mask &= ~Gdk.ModifierType.LOCK_MASK;

            if (!mask && keyval === Gdk.KEY_Escape) {
                this._editor?.close();
                return Gdk.EVENT_STOP;
            }

            if (
                !this.isValidBinding(mask, keycode, keyval) ||
                !this.isValidAccel(mask, keyval)
            )
                return Gdk.EVENT_STOP;

            if (!keyval && !keycode) {
                this._editor?.destroy();
                return Gdk.EVENT_STOP;
            } else {
                this.shortcut = Gtk.accelerator_name_with_keycode(
                    null,
                    keyval,
                    keycode,
                    mask,
                );
                this._label.set_accelerator(this.shortcut);
                this.emit('changed', this.shortcut);
            }

            this._editor?.destroy();
            return Gdk.EVENT_STOP;
        }

        keyvalIsForbidden(keyval) {
            return [
                Gdk.KEY_Home,
                Gdk.KEY_Left,
                Gdk.KEY_Up,
                Gdk.KEY_Right,
                Gdk.KEY_Down,
                Gdk.KEY_Page_Up,
                Gdk.KEY_Page_Down,
                Gdk.KEY_End,
                Gdk.KEY_Tab,
                Gdk.KEY_KP_Enter,
                Gdk.KEY_Return,
                Gdk.KEY_Mode_switch,
            ].includes(keyval);
        }

        isValidBinding(mask, keycode, keyval) {
            return !(
                mask === 0 ||
                (mask === Gdk.SHIFT_MASK &&
                    keycode !== 0 &&
                    ((keyval >= Gdk.KEY_a && keyval <= Gdk.KEY_z) ||
                        (keyval >= Gdk.KEY_A && keyval <= Gdk.KEY_Z) ||
                        (keyval >= Gdk.KEY_0 && keyval <= Gdk.KEY_9) ||
                        (keyval >= Gdk.KEY_kana_fullstop &&
                            keyval <= Gdk.KEY_semivoicedsound) ||
                        (keyval >= Gdk.KEY_Arabic_comma &&
                            keyval <= Gdk.KEY_Arabic_sukun) ||
                        (keyval >= Gdk.KEY_Serbian_dje &&
                            keyval <= Gdk.KEY_Cyrillic_HARDSIGN) ||
                        (keyval >= Gdk.KEY_Greek_ALPHAaccent &&
                            keyval <= Gdk.KEY_Greek_omega) ||
                        (keyval >= Gdk.KEY_hebrew_doublelowline &&
                            keyval <= Gdk.KEY_hebrew_taf) ||
                        (keyval >= Gdk.KEY_Thai_kokai &&
                            keyval <= Gdk.KEY_Thai_lekkao) ||
                        (keyval >= Gdk.KEY_Hangul_Kiyeog &&
                            keyval <= Gdk.KEY_Hangul_J_YeorinHieuh) ||
                        (keyval === Gdk.KEY_space && mask === 0) ||
                        this.keyvalIsForbidden(keyval)))
            );
        }

        isValidAccel(mask, keyval) {
            return (
                Gtk.accelerator_valid(keyval, mask) ||
                (keyval === Gdk.KEY_Tab && mask !== 0)
            );
        }
    }
);