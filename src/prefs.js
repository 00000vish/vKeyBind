import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';
import Gdk from 'gi://Gdk';

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
            'Maximize Mode',
            'Maximize the first opened window.',
        );
        settingGroup.add(maxmizeSwitch);

        const ultraWideSwitch = this._buildSwitchRow(
            Settings.ULTRA_WIDE_MODE,
            'UltraWide Mode',
            'Vertically maximize or centers the first window.',
        );
        settingGroup.add(ultraWideSwitch);

        const resizeAmountRow = this._buildSpinButtonRow(
            Settings.WINDOW_RESIZE_AMOUNT,
            'Resize Amount',
            'Window resize amount',
        );
        settingGroup.add(resizeAmountRow);

        const tileGroup = new Adw.PreferencesGroup({
            title: 'Tiling Settings',
            description: `Configure tiling settings.`,
        });
        prefsPage.add(tileGroup);

        const gridTileSwitch = this._buildSwitchRow(
            Settings.GRID_TILE_MODE,
            'Grid Tile Mode',
            'Tile windows in grid.',
        );
        tileGroup.add(gridTileSwitch);

        const windowMaxColumn = this._buildSpinButtonRow(
            Settings.WINDOW_MAX_COLUMNS,
            'Max Column Tiles',
            'Maximum columns of tiled windows.',
        );
        tileGroup.add(windowMaxColumn);

        const windowMaxRow = this._buildSpinButtonRow(
            Settings.WINDOW_MAX_ROWS,
            'Max Row Tiles',
            'Maximum rows of tiled windows.',
        );
        tileGroup.add(windowMaxRow);

        const footerGroup = new Adw.PreferencesGroup();
        prefsPage.add(footerGroup);

        let githubLink = `<a href="https://github.com/00000vish/gtile">GitHub</a>`;
        footerGroup.add(
            new Gtk.Label({
                label: `${this.metadata['name']} v${this.metadata['version']} · ${githubLink}`,
                useMarkup: true,
                margin_bottom: 32,
            }),
        );

        window.searchEnabled = true;
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
}
