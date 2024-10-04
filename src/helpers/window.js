import Meta from 'gi://Meta';
import logger from '../helpers/logger.js'

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

export function getWindowSize(window) {
    return window.ref.get_frame_rect();
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

export function getNearbyWindows(window, vertical, direction, strict = false) {
    let workspace = getWorkspace(window);
    let allWindows = getWindowsInWorkspace(workspace, false);
    let filteredWindows = filterWindows(window, allWindows, vertical, direction);

    if (filteredWindows.length <= 1 && !strict) {
        filteredWindows = allWindows;
    }

    let sortedWindowSizes = sortWindows(window, filteredWindows, vertical, direction);

    let currentIndex = sortedWindowSizes.findIndex(x => x.ref.get_id() === window.ref.get_id());

    return [currentIndex, sortedWindowSizes];
}

function filterWindows(window, windows, vertical, direction) {
    let filterCallback = (otherWindow) => {
        if (otherWindow.ref.get_id() === window.ref.get_id()) {
            return true;
        }

        let windowPosition = direction > 0
            ? vertical
                ? window.size.y + window.size.height
                : window.size.x + window.size.width
            : vertical
                ? window.size.y
                : window.size.x

        let otherWindowPosition = direction > 0
            ? vertical
                ? otherWindow.size.y + otherWindow.size.height
                : otherWindow.size.x + otherWindow.size.width
            : vertical
                ? otherWindow.size.y
                : otherWindow.size.x

        if (direction > 0 && windowPosition > otherWindowPosition ||
            direction < 0 && windowPosition < otherWindowPosition)
            return false;

        if (window.size.x < otherWindow.size.x &&
            window.size.x + window.size.width > otherWindow.size.x + otherWindow.size.width &&
            window.size.y < otherWindow.size.y &&
            window.size.y + window.size.height > otherWindow.size.y + otherWindow.size.height) {
            return false;
        }

        let otherWindowMin = vertical
            ? otherWindow.size.x
            : otherWindow.size.y;

        let otherWindowMax = vertical
            ? otherWindow.size.x + otherWindow.size.width
            : otherWindow.size.y + otherWindow.size.height;

        let windowMin = vertical
            ? window.size.x
            : window.size.y;

        let windowMax = vertical
            ? window.size.x + window.size.width
            : window.size.y + window.size.height;

        return windowMin < otherWindowMax && windowMax > otherWindowMin ||
            otherWindowMin < windowMax && otherWindowMax > windowMin;
    }

    return windows.filter(filterCallback);
}

function sortWindows(window, windows, vertical, direction) {
    let calculatedwindows = [];
    for (let otherWindow of windows) {

        let windowSize = window.size;
        let otherWindowSize = otherWindow.size;

        let min = vertical
            ? (otherWindowSize.x > windowSize.x ? otherWindowSize.x : windowSize.x)
            : (otherWindowSize.y > windowSize.y ? otherWindowSize.y : windowSize.y);

        let max = vertical
            ? (otherWindowSize.x + otherWindowSize.width < windowSize.x + windowSize.width
                ? otherWindowSize.x + otherWindowSize.width
                : windowSize.x + windowSize.width)
            : (otherWindowSize.y + otherWindowSize.height < windowSize.y + windowSize.height
                ? otherWindowSize.y + otherWindowSize.height
                : windowSize.y + windowSize.height);

        let closeness = vertical
            ? direction > 0
                ? otherWindowSize.y
                : otherWindowSize.y + otherWindowSize.height
            : direction > 0
                ? otherWindowSize.x
                : otherWindowSize.x + otherWindowSize.width;

        calculatedwindows.push({
            window: otherWindow,
            closeness: closeness - (max - min)
        });
    }

    return calculatedwindows.sort((a, b) => a.closeness - b.closeness).map(x => x.window);
}