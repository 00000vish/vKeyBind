# gtile

Gnome extension that allows user switch windows like a tiling window manager, and also can maximize first opened window vertically and horizontally, or just vertically, or just center the first opened window. And also can tile windows in a grid.   

## Table of Contents
1. [Keybinds](#keybinds)
2. [Video](#video)
3. [Install](#install)
4. [TODO](#todo)


## Keybinds <a name="keybinds"></a>

| Keys    | Action |
| -------- | ------- |
| META+CTRL+W  | Tile all opened windows in current workspace into grid. |
| META+SHIFT+H  | Switch focus to the window left. |
| META+SHIFT+L  | Switch focus to the window right. |
| META+SHIFT+J  | Switch focus to the window down. |
| META+SHIFT+K  | Switch focus to the window up. |

## Video Preview <a name="video"></a>

[Screencast.webm](https://github.com/user-attachments/assets/be06a0eb-e550-4e9d-91be-fb452f4015e4)

## Install <a name="install"></a>

1. ```git clone https://github.com/00000vish/gtile```
2. ```cd ./gtile ``` go inside the project directory.
3. (optional) ```vim ./src/schemas/org.gnome.shell.extensions.gtile.gschema``` to change keybinds.
4. ```./install.sh``` to install the gnome extension. 



## TODO <a name="todo"></a>

- [ ] Improve grid tiling.
- [ ] Remap keybind from settings.
