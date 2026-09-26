/**
 * js/modules/backup.js
 * Import / Export (Save Game / Load Game) logic.
 * Exposed via global `Backup`.
 */

const Backup = (() => {
    const _key = id => `pa_backup_${id}`;

    // ── Export ──────────────────────────────────────────────
    async function exportData() {
        const profileId = App.state.profileId;
        const images    = await DB.getByIndex('images', 'profileId', profileId);

        const blob = new Blob([JSON.stringify(images, null, 2)], { type: 'application/json' });
        const url  = URL.createObjectURL(blob);
        const date = new Date().toISOString().split('T')[0];

        const a = Object.assign(document.createElement('a'), {
            href:     url,
            download: `AIAlbum_${date}.json`
        });
        a.click();
        URL.revokeObjectURL(url);

        localStorage.setItem(_key(profileId), Date.now());
        Toast.show('Game Saved! (Exported)', '💾');
    }

    // ── Import ──────────────────────────────────────────────
    async function importData(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async ev => {
            try {
                const data = JSON.parse(ev.target.result);
                if (!Array.isArray(data)) throw new Error('Invalid format');

                const profileId = App.state.profileId;
                // Clear existing entries for this profile
                await DB.delByIndex('images', 'profileId', profileId);
                // Restore, re-binding to current profile
                for (const img of data) {
                    img.profileId = profileId;
                    await DB.put('images', img);
                }

                Gallery.refresh();
                localStorage.setItem(_key(profileId), Date.now());
                Toast.show('Game Loaded! (Imported)', '📂');
            } catch {
                alert('Could not read backup file. Make sure it is a valid AI.Album export.');
            }
            e.target.value = '';
        };
        reader.readAsText(file);
    }

    // ── 3-day reminder ─────────────────────────────────────
    function checkReminder(profileId) {
        const last = localStorage.getItem(_key(profileId));
        const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;
        if (!last || (Date.now() - parseInt(last)) > THREE_DAYS) {
            setTimeout(() => {
                Toast.show('Backup reminder: use Save Game (Export) to keep your data safe!', '🛡️');
            }, 2500);
        }
    }

    return { exportData, importData, checkReminder };
})();
