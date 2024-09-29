# vKeyBind

Gnome extension that allows user to focus, move, switch, resize windows like a tiling window manager using keybinds, and also can maximize first opened window vertically and horizontally, or just vertically, or just center the first opened window. And also can tile windows in a grid.   

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
| META+CTRL+SHIFT+H  | Switch current window with left window. |
| META+CTRL+SHIFT+L  | Switch current window with right window. |
| META+CTRL+SHIFT+J  | Switch current window with down window. |
| META+CTRL+SHIFT+K  | Switch current window with up window. |
| META+CTRL+H  | Move current window to the left. |
| META+CTRL+L  | Move current window to the right. |
| META+CTRL+J  | Move current window to the down. |
| META+CTRL+K  | Move current window to the up. |
| META+CTRL+ALT+H  | Snap current window to the left. |
| META+CTRL+ALT+L  | Snap current window to the right. |
| META+CTRL+ALT+J  | Snap current window to the down. |
| META+CTRL+ALT+K  | Snap current window to the up. |
| META+CTRL+H  | Shrink the focused window horizontally. |
| META+CTRL+L  | Grow the focused window horizontally. |
| META+CTRL+K  | Shrink the focused window vertically. |
| META+CTRL+J  | Grow the focused window vertically. |

## Video Preview <a name="video"></a>

[gtile.webm](https://github.com/user-attachments/assets/f9d38dc8-0a7d-4abb-b817-d11d9ea96064)

> In this video all window resizing and positioning is done with vKeyBind extension keybinds.

## Install <a name="install"></a>

### Gnome Extension
https://extensions.gnome.org/extension/7317/vkeybind/

### Building from source

1. ```git clone https://github.com/00000vish/vKeyBind```
2. ```cd ./vKeyBind ``` go inside the project directory.
3. (optional) ```vim ./src/schemas/org.gnome.shell.extensions.vkeybind.gschema.xml``` to change keybinds.
4. ```./install.sh``` to install the gnome extension. 



## TODO <a name="todo"></a>

- [ ] Improve tiling logic.
- [ ] Improve snap logic.


## Thanks 
https://github.com/domferr/tilingshell
