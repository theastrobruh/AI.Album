/**
 * js/app.js
 * Application entry point — initializes the DB, wires up all
 * modules, registers global keyboard shortcuts.
 *
 * Load order (defined in index.html):
 *   data/builtins.js → data/store-packs.js →
 *   core/db.js → core/toast.js → core/starfield.js →
 *   modules/tags.js → modules/profiles.js → modules/gallery.js →
 *   modules/lightbox.js → modules/modal.js →
 *   modules/store.js → modules/backup.js →
 *   app.js  ← this file
 */

const App = (() => {
    // ── Shared state ────────────────────────────────────────
    const state = {
        profileId: null
    };

    // ── Tab switching ────────────────────────────────────────
    function switchTab(tab) {
        ['gallery', 'store'].forEach(t => {
            document.getElementById(`view-${t}`).classList.add('hidden');
            document.getElementById(`tab-${t}`).className =
                'px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ' +
                (t === tab
                    ? 'text-white bg-violet-600/60'
                    : 'text-slate-400 hover:text-white hover:bg-white/5');
        });

        document.getElementById(`view-${tab}`).classList.remove('hidden');

        // Tag filter bar only visible in gallery
        document.getElementById('tag-filter-bar').style.display =
            tab === 'gallery' ? '' : 'none';
    }

    // ── Keyboard shortcuts ───────────────────────────────────
    function _bindKeys() {
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                Lightbox.close(null, true);
                Modal.close();
            }
        });
    }

    // ── Bootstrap ───────────────────────────────────────────
    async function init() {
        await DB.open();
        Profiles._bindForm();
        Modal.init();
        _bindKeys();
        Profiles.checkSession();
    }

    // Start when DOM is ready
    window.addEventListener('DOMContentLoaded', init);

    return { state, switchTab };
})();
