import Meta from 'gi://Meta';

import Direction from '../enums/direction.js';

export function getFocusedWindow() {
    var window = global.display.get_focus_window();

    return {
        ref: window,
        size: window.get_frame_rect()
    };
}

export function getWorkspace(window) {
    return window.ref.get_workspace();
}

export function getWindowsInWorkspace(workspace, activeMonitorOnly) {
    let display = workspace.get_display();
    let currentMonitor = display.get_current_monitor();

    let windows = workspace.list_windows();

    let windowList = [];
    for (let window of windows) {
        let monitor = window.get_monitor();

        if (monitor !== currentMonitor && activeMonitorOnly)
            continue;

        windowList.push({
            ref: window,
            size: window.get_frame_rect()
        });
    }

    return windowList;
}

export function invokeOnWinowReady(window, callback) {
    let windowActor = window.ref.get_compositor_private();
    windowActor.remove_all_transitions();

    let signal = windowActor.connect(
        "first-frame",
        ((_) => {
            callback(window);

            windowActor.disconnect(signal);

        }).bind(this)
    );
}

export function centerWindow(window, size) {
    let middle = {
        x: (size.x + size.width / 2) - (window.size.width / 2),
        y: (size.y + size.height / 2) - (window.size.height / 2),
    };

    window.ref.move_frame(false, middle.x, middle.y);
}

export function resizeWindow(window, size) {
    window.ref.unmaximize(Meta.MaximizeFlags.BOTH)
    window.ref.move_frame(false, size.x, size.y);
    window.ref.move_resize_frame(
        false,
        size.x,
        size.y,
        size.width,
        size.height,
    );
}

export function maximizeWindow(window) {
    window.ref.maximize(Meta.MaximizeFlags.BOTH);
    window.ref.focus(global.get_current_time());
}

export function focusWindow(window) {
    window.ref.make_above();
    window.ref.focus(global.get_current_time());
    window.ref.unmake_above();
}

export function getNearbyWindows(window, direction, strict = true) {
    let windows = getNearbyWindowsInner(window, true, direction);
    if (windows.length === 0 && !strict) {
        windows = getNearbyWindowsInner(window, false, direction);
    }
    return windows;
}

function getNearbyWindowsInner(window, activeMonitorOnly, direction) {
    let workspace = getWorkspace(window);
    let windows = getWindowsInWorkspace(workspace, activeMonitorOnly);
    windows = windows.filter(x => x.ref.get_id() !== window.ref.get_id());
    windows = filterWindowDirection(window, windows, direction);
    return sortWindows(window, windows, direction);
}

function filterWindowDirection(focusWindow, windows, direction) {
    let filterCallback = (otherWindow) => {
        switch (direction) {
            case Direction.Up:
                return otherWindow.size.y < focusWindow.size.y;
            case Direction.Down:
                return otherWindow.size.y > focusWindow.size.y + focusWindow.size.height;
            case Direction.Left:
                return otherWindow.size.x < focusWindow.size.x;
            case Direction.Right:
                return otherWindow.size.x > focusWindow.size.x + focusWindow.size.width;
        }
        return false;
    }

    return windows.filter(filterCallback);
}

function getWindowEdgePoint(window, direction) {
    function getMiddle(start, size) {
        return (start + (size / 2));
    }

    switch (direction) {
        case Direction.Down:
            return [getMiddle(window.size.x, window.size.width), window.size.y];
        case Direction.Up:
            return [getMiddle(window.size.x, window.size.width), (window.size.y + window.size.height)];
        case Direction.Left:
            return [(window.size.x + window.size.width), getMiddle(window.size.y, window.size.height)];
        case Direction.Right:
            return [window.size.x, getMiddle(window.size.y, window.size.height)];
    }

    return [window.size.x, window.size.y];
}

function sortWindows(focusWindow, windows, direction) {
    let calculatedWindows = [];

    let [focusX, focusY] = getWindowEdgePoint(focusWindow, Direction.getOpposite(direction));

    for (let otherWindow of windows) {

        let [otherX, otherY] = getWindowEdgePoint(otherWindow, direction);

        let valueOne = Math.pow((otherX - focusX), 2);
        let valueTwo = Math.pow((otherY - focusY), 2);
        let distance = Math.sqrt((valueOne + valueTwo));

        calculatedWindows.push({
            window: otherWindow,
            distance: distance
        });
    }

    return calculatedWindows.sort((a, b) => a.distance - b.distance).map(x => x.window);
}