/**
 * js/modules/modal.js
 * Add / Edit memory modal — form handling and validation.
 * Exposed via global `Modal`.
 */

const Modal = (() => {
    // ── Open ────────────────────────────────────────────────
    function open() {
        document.getElementById('modal-title').textContent = 'Add New Memory';
        _resetForm();
        Tags.buildSelector(document.getElementById('tag-selector'), []);
        document.getElementById('add-image-modal').classList.remove('hidden');
    }

    // ── Close ───────────────────────────────────────────────
    function close() {
        document.getElementById('add-image-modal').classList.add('hidden');
        _resetForm();
    }

    // ── Reset form fields ───────────────────────────────────
    function _resetForm() {
        document.getElementById('add-entry-form').reset();
        document.getElementById('file-name').textContent = 'Click or drop image here';
        document.getElementById('gen-model').value = 'Nano Banana';
    }

    // ── File input label update ─────────────────────────────
    function _bindFileInput() {
        document.getElementById('image-upload').onchange = e => {
            const f = e.target.files[0];
            if (f) document.getElementById('file-name').textContent = f.name;
        };
    }

    // ── Form submit ─────────────────────────────────────────
    function _bindSubmit() {
        document.getElementById('add-entry-form').onsubmit = async e => {
            e.preventDefault();

            const file      = document.getElementById('image-upload').files[0];
            const prompt    = document.getElementById('prompt-text').value.trim();
            const tags      = Tags.getSelected(document.getElementById('tag-selector'));
            const model     = document.getElementById('gen-model').value.trim();
            const vae       = document.getElementById('gen-vae').value.trim();
            const negPrompt = document.getElementById('gen-neg-prompt').value.trim();
            const steps     = document.getElementById('gen-steps').value.trim();
            const cfg       = document.getElementById('gen-cfg').value.trim();
            const seed      = document.getElementById('gen-seed').value.trim();
            const sampler   = document.getElementById('gen-sampler').value.trim();

            if (!prompt) { Toast.show('Please add a prompt!', '⚠️'); return; }

            const entry = {
                id:        'img_' + Date.now(),
                profileId: App.state.profileId,
                dataUrl:   null,
                prompt, tags, model, vae, negPrompt, steps, cfg, seed, sampler,
                date: Date.now()
            };

            if (file) {
                const reader = new FileReader();
                reader.onload = async ev => {
                    entry.dataUrl = ev.target.result;
                    await DB.put('images', entry);
                    close();
                    Gallery.refresh();
                    Toast.show('Saved to Album!');
                };
                reader.readAsDataURL(file);
            } else {
                await DB.put('images', entry);
                close();
                Gallery.refresh();
                Toast.show('Prompt saved (no image)!');
            }
        };
    }

    // ── Init (called from app.js) ───────────────────────────
    function init() {
        _bindFileInput();
        _bindSubmit();
    }

    return { open, close, init };
})();
