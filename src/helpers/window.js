import Meta from 'gi://Meta';

export function getWindowsInWorkspace(workspace, activeMonitorOnly) {
    let display = workspace.get_display();
    let currentMonitor = display.get_current_monitor();

    let windows = workspace.list_windows();

    let windowList = [];
    for (let window of windows) {
        let monitor = window.get_monitor();
        if (monitor !== currentMonitor && activeMonitorOnly)
            continue;

        windowList.push(window);
    }

    return windowList;
}

export function getWorkspace(window) {
    return window.get_workspace();
}

export function getFocusedWindow() {
    return global.display.get_focus_window();
}

export function getWindowSize(window) {
    return window.get_frame_rect();
}

export function invokeOnWinowReady(window, callback) {
    let windowActor = window.get_compositor_private();

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
    let windowSize = window.get_frame_rect();

    let middle = {
        x: (size.x + size.width / 2) - (windowSize.width / 2),
        y: (size.y + size.height / 2) - (windowSize.height / 2),
    };

    window.move_frame(false, middle.x, middle.y);
}

export function resizeWindow(window, size) {
    window.unmaximize(Meta.MaximizeFlags.BOTH)

    window.move_frame(false, size.x, size.y);

    window.move_resize_frame(
        false,
        size.x,
        size.y,
        size.width,
        size.height,
    );
}

export function maximizeWindow(window) {
    window.maximize(Meta.MaximizeFlags.BOTH);

    window.focus(global.get_current_time());
}

export function focusWindow(window) {
    window.make_above();
    window.focus(global.get_current_time());
    window.unmake_above();
}

export function getWindowSizes(workspace, activeMonitorOnly) {
    let windows = getWindowsInWorkspace(workspace, activeMonitorOnly);

    let windowSizes = [];
    for (let window of windows) {
        let size = window.get_frame_rect();
        windowSizes.push(
            {
                window: window,
                size: size
            }
        );
    }

    return windowSizes;
}

export function getNearbyWindows(window, vertical, direction, strict = false) {
    let workspace = getWorkspace(window);

    let allWindowSizes = getWindowSizes(workspace, false);

    let filteredWindowSizes = filterWindows(window, allWindowSizes, vertical);

    if (filteredWindowSizes.length <= 1 && !strict) {
        filteredWindowSizes = allWindowSizes;
    }

    let sortedWindowSizes = sortWindows(window, filteredWindowSizes, vertical, direction);

    let currentIndex = sortedWindowSizes.findIndex(x => x.window === window);

    return [currentIndex, sortedWindowSizes];
}

function filterWindows(window, windows, vertical) {
    let windowSize = getWindowSize(window);

    let filterCallback = (otherWindow) => {

        let otherWindowSize = otherWindow.size;

        if (windowSize.x < otherWindowSize.x &&
            windowSize.width > otherWindowSize.width &&
            windowSize.y < otherWindowSize.y &&
            windowSize.height > otherWindowSize.height) {
            return false;
        }

        let otherWindowMin = vertical
            ? otherWindowSize.x
            : otherWindowSize.y;

        let otherWindowMax = vertical
            ? otherWindowSize.x + otherWindowSize.width
            : otherWindowSize.y + otherWindowSize.height;

        let windowMin = vertical
            ? windowSize.x
            : windowSize.y;

        let windowMax = vertical
            ? windowSize.x + windowSize.width
            : windowSize.y + windowSize.height;

        return windowMin < otherWindowMax && windowMax > otherWindowMin
            || otherWindowMin < windowMax && otherWindowMax > windowMin;
    }

    return windows.filter(filterCallback);
}

function sortWindows(window, windows, vertical, direction) {
    let windowSize = getWindowSize(window);

    let calculatedwindows = [];
    for (let otherWindow of windows) {

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

    calculatedwindows = calculatedwindows.sort((a, b) => a.closeness - b.closeness);

    return calculatedwindows.map(x => x.window);
}