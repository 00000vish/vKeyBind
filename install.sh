#! /bin/bash

sudo echo "Installing vKeyBind..."

INSTALL_DIR=~/.local/share/gnome-shell/extensions/vkeybind@00000vish

if [ -d "$INSTALL_DIR" ]; then
    rm -r $INSTALL_DIR
fi

mkdir -p $INSTALL_DIR

cp -r ./src/* $INSTALL_DIR/

glib-compile-schemas $INSTALL_DIR/schemas/

sudo systemctl restart gdm  

