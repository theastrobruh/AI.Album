/**
 * js/modules/tags.js
 * Tag system — filter bar, tag chip selector, helpers.
 * Exposed via global `Tags`.
 */

const Tags = (() => {
    const ALL = [
        'Tools', 'Marketing', 'Modeling', 'Architecture',
        'Design', 'Upscaling', 'Outpaint', 'Portrait',
        'Full Body', 'Concept Art', 'Illustration', 'Misc'
    ];

    let _activeFilter = null;

    // ── Filter bar (in nav) ─────────────────────────────────
    function renderFilterBar() {
        const bar = document.getElementById('tag-filter-bar');
        bar.innerHTML = '';
        ALL.forEach(tag => {
            const chip = document.createElement('button');
            chip.className = 'tag-chip' + (_activeFilter === tag ? ' selected' : '');
            chip.textContent = tag;
            chip.onclick = () => {
                _activeFilter = (_activeFilter === tag) ? null : tag;
                renderFilterBar();
                _toggleNotice();
                // Gallery is refreshed by the Gallery module
                Gallery.refresh();
            };
            bar.appendChild(chip);
        });
    }

    function _toggleNotice() {
        const notice = document.getElementById('active-filter-notice');
        const tagEl  = document.getElementById('active-filter-tag');
        if (_activeFilter) {
            notice.classList.remove('hidden');
            notice.classList.add('flex');
            tagEl.textContent = _activeFilter;
        } else {
            notice.classList.add('hidden');
            notice.classList.remove('flex');
        }
    }

    function clearFilter() {
        _activeFilter = null;
        renderFilterBar();
        _toggleNotice();
        Gallery.refresh();
    }

    // ── Tag selector inside the Add modal ──────────────────
    function buildSelector(container, selected = []) {
        container.innerHTML = '';
        ALL.forEach(tag => {
            const chip = document.createElement('button');
            chip.type      = 'button';
            chip.className = 'tag-chip' + (selected.includes(tag) ? ' selected' : '');
            chip.textContent = tag;
            chip.dataset.tag = tag;
            chip.onclick = () => chip.classList.toggle('selected');
            container.appendChild(chip);
        });
    }

    function getSelected(container) {
        return [...container.querySelectorAll('.tag-chip.selected')]
            .map(c => c.dataset.tag);
    }

    // ── Tiny pill render for cards/lightbox ────────────────
    function renderPills(tags = [], style = '') {
        return tags
            .slice(0, 2)
            .map(t => `<span class="tag-chip" style="font-size:9px;padding:1px 6px;${style}">${t}</span>`)
            .join('');
    }

    return {
        ALL,
        get activeFilter() { return _activeFilter; },
        renderFilterBar,
        clearFilter,
        buildSelector,
        getSelected,
        renderPills
    };
})();
