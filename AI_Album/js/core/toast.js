/**
 * js/core/toast.js
 * Lightweight notification system.
 * Usage: Toast.show('Message', '🎉')
 */

const Toast = (() => {
    let _timer = null;

    function show(msg, icon = '✨') {
        clearTimeout(_timer);
        const el   = document.getElementById('toast');
        const msgEl = document.getElementById('toast-msg');
        const iconEl = document.getElementById('toast-icon');

        msgEl.textContent  = msg;
        iconEl.textContent = icon;

        el.classList.remove('opacity-0', '-translate-y-4');

        _timer = setTimeout(() => {
            el.classList.add('opacity-0', '-translate-y-4');
        }, 3500);
    }

    return { show };
})();
