/**
 * js/modules/profiles.js
 * Profile creation, selection, deletion, and session management.
 * Exposed via global `Profiles`.
 */

const Profiles = (() => {
    // ── Check saved session ────────────────────────────────
    async function checkSession() {
        const saved = localStorage.getItem('pa_current_profile');
        if (saved) {
            const profile = await DB.get('profiles', saved);
            profile ? loadProfile(profile) : showSelector();
        } else {
            showSelector();
        }
    }

    // ── Show profile selector screen ───────────────────────
    async function showSelector() {
        document.getElementById('profile-view').classList.remove('hidden');
        document.getElementById('app-view').classList.add('hidden');

        const profiles = await DB.getAll('profiles');
        const list     = document.getElementById('profiles-list');
        list.innerHTML  = '';

        if (!profiles.length) {
            list.innerHTML = '<p class="text-center text-slate-600 text-sm py-4">No profiles yet — create one below.</p>';
            return;
        }

        profiles.forEach(p => {
            const div = document.createElement('div');
            div.className = 'flex justify-between items-center p-4 rounded-2xl bg-violet-500/5 hover:bg-violet-500/10 border border-violet-500/15 transition-all cursor-pointer group';
            div.innerHTML = `
                <div class="flex-1 font-semibold text-slate-200" onclick="Profiles._loadById('${p.id}')">${p.name}</div>
                <button onclick="Profiles.delete('${p.id}', event)"
                        class="text-transparent group-hover:text-rose-500 p-1.5 hover:bg-rose-500/10 rounded-lg transition-all text-sm">✕</button>
            `;
            list.appendChild(div);
        });
    }

    // ── Load profile by ID (called from HTML) ──────────────
    async function _loadById(id) {
        const profile = await DB.get('profiles', id);
        if (profile) loadProfile(profile);
    }

    // ── Activate a profile ─────────────────────────────────
    async function loadProfile(profile) {
        App.state.profileId = profile.id;
        localStorage.setItem('pa_current_profile', profile.id);

        document.getElementById('current-profile-display').textContent = profile.name;
        document.getElementById('profile-view').classList.add('hidden');
        document.getElementById('app-view').classList.remove('hidden');

        await _seedBuiltins(profile.id);

        App.switchTab('gallery');
        Tags.renderFilterBar();
        Gallery.refresh();
        Store.render();
        Backup.checkReminder(profile.id);
        Toast.show(`Welcome back, ${profile.name}!`);
    }

    // ── Seed built-in prompts (once per profile) ───────────
    async function _seedBuiltins(profileId) {
        const existing = await DB.getByIndex('images', 'profileId', profileId);
        for (const bp of BUILTIN_PROMPTS) {
            const localId = `${profileId}_${bp.id}`;
            if (!existing.find(e => e.id === localId)) {
                await DB.put('images', {
                    id:        localId,
                    profileId,
                    dataUrl:   null,
                    prompt:    bp.prompt,
                    tags:      bp.tags,
                    model:     bp.model,
                    title:     bp.title,
                    builtin:   true,
                    date:      Date.now() - 1000
                });
            }
        }
    }

    // ── Delete a profile ───────────────────────────────────
    async function deleteProfile(id, e) {
        e.stopPropagation();
        if (!confirm('Delete this profile and all its data?')) return;
        await DB.del('profiles', id);
        await DB.delByIndex('images', 'profileId', id);
        if (App.state.profileId === id) {
            localStorage.removeItem('pa_current_profile');
            App.state.profileId = null;
        }
        showSelector();
    }

    // ── Logout / switch profile ────────────────────────────
    function logout() {
        App.state.profileId = null;
        localStorage.removeItem('pa_current_profile');
        showSelector();
    }

    // ── Register "Add profile" form ────────────────────────
    function _bindForm() {
        document.getElementById('add-profile-form').onsubmit = async e => {
            e.preventDefault();
            const nameEl = document.getElementById('new-profile-name');
            const name   = nameEl.value.trim();
            if (!name) return;
            const profile = { id: 'p_' + Date.now(), name, createdAt: Date.now() };
            await DB.add('profiles', profile);
            nameEl.value = '';
            loadProfile(profile);
        };
    }

    return {
        checkSession,
        showSelector,
        loadProfile,
        _loadById,      // called from inline HTML onclick
        delete: deleteProfile,
        logout,
        _bindForm
    };
})();
