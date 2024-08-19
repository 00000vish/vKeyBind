# gtile

Gnome extension that allows user switch and resize windows like a tiling window manager using keybinds, and also can maximize first opened window vertically and horizontally, or just vertically, or just center the first opened window. And also can tile windows in a grid.   

## Table of Contents
1. [Keybinds](#keybinds)
2. [Video](#video)
3. [Install](#install)
4. [TODO](#todo)


## Keybinds <a name="keybinds"></a>

| Keys    | Action |
| -------- | ------- |
| META+CTRL+W  | Tile all opened windows in current workspace. |
| META+SHIFT+H  | Switch focus to the window left. |
| META+SHIFT+L  | Switch focus to the window right. |
| META+SHIFT+J  | Switch focus to the window down. |
| META+SHIFT+K  | Switch focus to the window up. |
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
