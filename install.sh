#! /bin/bash

sudo echo "Installing Gtile..."

INSTALL_DIR=~/.local/share/gnome-shell/extensions/gtile@00000vish

if [ -d "$INSTALL_DIR" ]; then
    rm -r $INSTALL_DIR
fi

mkdir $INSTALL_DIR

cp -r ./src/* $INSTALL_DIR/

glib-compile-schemas $INSTALL_DIR/schemas/

sudo systemctl restart gdm  

