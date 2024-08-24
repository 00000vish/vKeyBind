import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export function getScreenSize(workspace) {
    let monitors = Main.layoutManager.monitors;
    let display = workspace.get_display();
    let monitorIndex = display.get_current_monitor();
    let monitor = monitors[monitorIndex];

    let topBar = Main.panel;
    let barHeight = topBar.actor.get_height();

    let x = monitor.x;
    let y = monitor.y + barHeight;
    let width = monitor.width;
    let height = monitor.height - barHeight;

    return _createSize(x, y, width, height);
}

export function splitUltraWide(screen) {
    let splits = splitScreenColumns(screen, 4);

    return _combineScreenSizes(splits[1], splits[2]);
}

export function splitScreenColumns(screen, splitCount) {
    let newWidth = screen.width / splitCount;
    let newHeight = screen.height;

    return _splitScreen(splitCount, screen, newWidth, newHeight, false);
}


export function splitScreenRows(screen, splitCount) {
    let newWidth = screen.width;
    let newHeight = screen.height / splitCount;

    return _splitScreen(splitCount, screen, newWidth, newHeight, true);
}

function _splitScreen(splitCount, screenSize, newWidth, newHeight, vertical) {
    if (splitCount === 0)
        return [screenSize];

    let newSizes = []

    let x = screenSize.x;
    let y = screenSize.y;

    for (let v = 0; v < splitCount; v++) {
        newSizes.push(
            _createSize(x, y, newWidth, newHeight)
        );

        if (vertical) {
            y += newHeight;
        }
        else {
            x += newWidth;
        }
    }

    return newSizes;
}

function _createSize(x, y, width, height) {
    return {
        x: x,
        y: y,
        width: width,
        height: height,
    }
}

function _combineScreenSizes(screenSizeOne, screenSizeTwo) {
    let x = screenSizeOne.x;
    if (screenSizeTwo.x < x)
        x = screenSizeTwo.x;

    let y = screenSizeOne.y;
    if (screenSizeTwo.y < y)
        y = screenSizeTwo.y;

    let width = screenSizeOne.width + screenSizeTwo.width;

    let height = screenSizeOne.height + screenSizeTwo.height;

    return _createSize(x, y, width, height)
}
