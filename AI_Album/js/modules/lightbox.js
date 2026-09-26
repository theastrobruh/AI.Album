/**
 * js/modules/lightbox.js
 * Full-screen image viewer with generation data pill.
 * Exposed via global `Lightbox`.
 */

const Lightbox = (() => {
    let _current = null;

    // ── Open ────────────────────────────────────────────────
    function open(imgData) {
        _current = imgData;

        const modal    = document.getElementById('fs-modal');
        const fsImg    = document.getElementById('fs-image');
        const fsPill   = document.getElementById('fs-pill');
        const fsPrompt = document.getElementById('fs-prompt');
        const fsTags   = document.getElementById('fs-tags');
        const fsDet    = document.getElementById('fs-details');
        const delBtn   = document.getElementById('fs-delete-btn');

        // Show modal
        modal.classList.remove('hidden');
        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0');
            fsImg.classList.remove('scale-95');
            fsPill.classList.remove('translate-y-5', 'opacity-0');
        });

        // Image
        fsImg.src = imgData.dataUrl || Gallery.FALLBACK;
        fsImg.onerror = () => { fsImg.src = Gallery.FALLBACK; };

        // Tags
        fsTags.innerHTML = (imgData.tags || [])
            .map(t => `<span class="tag-chip" style="font-size:9px;padding:1px 7px">${t}</span>`)
            .join('');

        // Prompt text
        if (imgData.isStore) {
            fsPrompt.innerHTML = `
                <span class="text-violet-300 font-bold text-base block mb-1">${imgData.title}</span>
                <span class="text-slate-400 text-xs font-bold">${imgData.price}</span>
                <span class="text-sm text-slate-300 block mt-1">${imgData.prompt}</span>`;
            delBtn.classList.add('hidden');
        } else {
            fsPrompt.innerHTML = imgData.title
                ? `<span class="text-violet-300 font-bold block mb-1">${imgData.title}</span>
                   <span class="text-sm text-slate-100">${imgData.prompt}</span>`
                : `<span class="text-sm text-slate-100">${imgData.prompt}</span>`;
            delBtn.classList.remove('hidden');
            delBtn.onclick = () => Gallery.deleteImage(imgData.id);
        }

        // Generation details grid
        fsDet.innerHTML = '';
        const pairs = [
            ['Model',    imgData.model],
            ['VAE',      imgData.vae],
            ['Steps',    imgData.steps],
            ['CFG',      imgData.cfg],
            ['Seed',     imgData.seed],
            ['Sampler',  imgData.sampler],
        ].filter(([, v]) => v);

        if (pairs.length || imgData.negPrompt) {
            fsDet.classList.remove('hidden');
            pairs.forEach(([label, val]) => {
                fsDet.innerHTML += `<div><span class="text-slate-500">${label}:</span> <span class="text-slate-200">${val}</span></div>`;
            });
            if (imgData.negPrompt) {
                fsDet.innerHTML += `<div class="col-span-2"><span class="text-slate-500">Negative:</span> <span class="text-slate-200">${imgData.negPrompt}</span></div>`;
            }
        } else {
            fsDet.classList.add('hidden');
        }
    }

    // ── Close ───────────────────────────────────────────────
    function close(e, force = false) {
        if (!force && e && e.target !== document.getElementById('fs-modal')) return;

        const modal  = document.getElementById('fs-modal');
        const fsImg  = document.getElementById('fs-image');
        const fsPill = document.getElementById('fs-pill');

        modal.classList.add('opacity-0');
        fsImg.classList.add('scale-95');
        fsPill.classList.add('translate-y-5', 'opacity-0');

        setTimeout(() => {
            modal.classList.add('hidden');
            fsImg.src = '';
            _current  = null;
        }, 300);
    }

    // ── Copy current prompt to clipboard ───────────────────
    function copyPrompt() {
        if (!_current) return;
        navigator.clipboard.writeText(_current.prompt)
            .then(() => Toast.show('Prompt copied!', '📋'));
    }

    return { open, close, copyPrompt };
})();
