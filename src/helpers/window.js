import Meta from 'gi://Meta';

export function getWorkspace(window) {
    return window.get_workspace();
}

export function getFocusedWindow() {
    return global.display.get_focus_window();
}

export function getWindowSize(window) {
    return window.get_frame_rect();
}

export function invokeOnWinowReady(window, callback){
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