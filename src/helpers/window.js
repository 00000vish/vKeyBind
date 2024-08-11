import Meta from 'gi://Meta';

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
    window.focus(global.get_current_time());
}