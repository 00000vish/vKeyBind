#! /bin/bash

sudo echo "Installing Gtile..."

mkdir ~/.local/share/gnome-shell/extensions/gtile@00000vish/

cp -r ./src/* ~/.local/share/gnome-shell/extensions/gtile@00000vish/

glib-compile-schemas ~/.local/share/gnome-shell/extensions/gtile@00000vish/schemas/

sudo systemctl restart gdm  

