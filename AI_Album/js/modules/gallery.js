/**
 * js/modules/gallery.js
 * Gallery rendering — card creation and grid management.
 * Exposed via global `Gallery`.
 */

const Gallery = (() => {
    const FALLBACK = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='600'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%231a1235'/><stop offset='1' stop-color='%230b0820'/></linearGradient></defs><rect width='400' height='600' fill='url(%23g)'/></svg>`;

    // ── Refresh grid ────────────────────────────────────────
    async function refresh() {
        const grid   = document.getElementById('gallery-grid');
        const empty  = document.getElementById('empty-state');
        const count  = document.getElementById('item-count');
        grid.innerHTML = '';

        let images = await DB.getByIndex('images', 'profileId', App.state.profileId);
        images.sort((a, b) => b.date - a.date);

        // Apply active tag filter
        if (Tags.activeFilter) {
            images = images.filter(img => img.tags && img.tags.includes(Tags.activeFilter));
        }

        count.textContent = images.length;

        if (!images.length) {
            empty.classList.remove('hidden'); empty.classList.add('flex');
        } else {
            empty.classList.add('hidden'); empty.classList.remove('flex');
            images.forEach(img => grid.appendChild(createCard(img)));
        }
    }

    // ── Build a gallery card ────────────────────────────────
    function createCard(img) {
        const div = document.createElement('div');
        div.className = 'fantasy-card shimmer-host rounded-2xl overflow-hidden relative cursor-pointer transform transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_35px_rgba(167,139,250,.18)] group';
        div.onclick = () => Lightbox.open(img);

        const imageEl = img.dataUrl
            ? `<img src="${img.dataUrl}"
                    class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onerror="this.src='${FALLBACK}'">`
            : `<div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-900/40 to-indigo-900/20">
                   <svg class="w-10 h-10 text-violet-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                             d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                   </svg>
               </div>`;

        const tagPills = Tags.renderPills(img.tags || []);

        div.innerHTML = `
            ${imageEl}
            <div class="absolute inset-0 bg-gradient-to-t from-[#07071a] via-[#07071a]/20 to-transparent"></div>
            ${img.builtin ? '<div class="builtin-badge">Built-in</div>' : ''}
            <div class="absolute bottom-0 left-0 right-0 p-3 transform translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
                ${tagPills ? `<div class="flex flex-wrap gap-1 mb-1.5">${tagPills}</div>` : ''}
                <p class="text-[11px] text-slate-300 line-clamp-2 leading-snug group-hover:text-white transition-colors">
                    ${img.title || img.prompt}
                </p>
            </div>
            <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-violet-400/20 transition-colors pointer-events-none"></div>
        `;

        return div;
    }

    // ── Delete an image ─────────────────────────────────────
    async function deleteImage(id) {
        if (!confirm('Remove this from your album?')) return;
        await DB.del('images', id);
        Lightbox.close(null, true);
        refresh();
        Toast.show('Removed.', '🗑️');
    }

    return { refresh, createCard, deleteImage, FALLBACK };
})();
