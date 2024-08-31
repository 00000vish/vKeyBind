# gtile

Gnome extension that allows user to switch focus, move, switch windows, resize windows like a tiling window manager using keybinds, and also can maximize first opened window vertically and horizontally, or just vertically, or just center the first opened window. And also can tile windows in a grid.   

## Table of Contents
1. [Keybinds](#keybinds)
2. [Video](#video)
3. [Install](#install)
4. [TODO](#todo)


## Keybinds <a name="keybinds"></a>

| Keys    | Action |
| -------- | ------- |
| META+CTRL+W  | Tile all opened windows in current workspace. |
| META+SHIFT+H  | Focus to the window left. |
| META+SHIFT+L  | Focus to the window right. |
| META+SHIFT+J  | Focus to the window down. |
| META+SHIFT+K  | Focus to the window up. |
| META+CTRL+ALT+H  | Switch current window with left window. |
| META+CTRL+ALT+L  | Switch current window with right window. |
| META+CTRL+ALT+J  | Switch current window with down window. |
| META+CTRL+ALT+K  | Switch current window with up window. |
| META+CTRL+H  | Move current window to the left. |
| META+CTRL+L  | Move current window to the right. |
| META+CTRL+J  | Move current window to the down. |
| META+CTRL+K  | Move current window to the up. |
| META+CTRL+SHIFT+H  | Snap current window to the left. |
| META+CTRL+SHIFT+L  | Snap current window to the right. |
| META+CTRL+SHIFT+J  | Snap current window to the down. |
| META+CTRL+SHIFT+K  | Snap current window to the up. |
| META+CTRL+H  | Shrink the focused window horizontally. |
| META+CTRL+L  | Grow the focused window horizontally. |
| META+CTRL+K  | Shrink the focused window vertically. |
| META+CTRL+J  | Grow the focused window vertically. |

## Video Preview <a name="video"></a>

[gtile.webm](https://github.com/user-attachments/assets/f9d38dc8-0a7d-4abb-b817-d11d9ea96064)

> In this video all window resizing and positioning is done with gtile exteions keybinds.

## Install <a name="install"></a>

1. ```git clone https://github.com/00000vish/gtile```
2. ```cd ./gtile ``` go inside the project directory.
3. (optional) ```vim ./src/schemas/org.gnome.shell.extensions.gtile.gschema.xml``` to change keybinds.
4. ```./install.sh``` to install the gnome extension. 



## TODO <a name="todo"></a>

- [ ] Improve grid tiling.
- [ ] Remap keybind from settings.
