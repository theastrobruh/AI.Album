/**
 * js/modules/store.js
 * Mini-Store rendering — pack cards and detail viewer.
 * Exposed via global `Store`.
 */

const Store = (() => {
    function render() {
        const grid = document.getElementById('store-grid');
        grid.innerHTML = '';

        STORE_PACKS.forEach(pack => {
            const card = document.createElement('div');
            card.className = 'fantasy-card shimmer-host rounded-2xl overflow-hidden relative cursor-pointer transform transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_35px_rgba(167,139,250,.2)] group';
            card.style.aspectRatio = '16/9'; // Store cards are wider
            card.onclick = () => _openPackDetail(pack);

            card.innerHTML = `
                <img src="${pack.img}"
                     class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     loading="lazy"
                     onerror="this.src='${Gallery.FALLBACK}'">
                <div class="absolute inset-0 bg-gradient-to-t from-[#07071a] via-[#07071a]/30 to-transparent"></div>

                <!-- Pack number badge -->
                <div class="absolute top-3 left-3 z-10">
                    <span class="text-[9px] font-bold tracking-widest uppercase text-violet-300
                                 bg-black/50 backdrop-blur-sm border border-violet-500/25
                                 px-2 py-0.5 rounded-md">
                        ${pack.title}
                    </span>
                </div>

                <!-- Price badge -->
                <div class="absolute top-3 right-3 z-10">
                    <span class="text-[11px] font-black text-white bg-violet-600/90
                                 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                        ${pack.price}
                    </span>
                </div>

                <!-- Footer info -->
                <div class="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1.5 group-hover:translate-y-0 transition-transform duration-300">
                    <p class="text-sm font-bold text-white mb-0.5">${pack.subtitle}</p>
                    <p class="text-[11px] text-slate-300 line-clamp-2 leading-snug">${pack.desc}</p>
                </div>

                <!-- Hover border -->
                <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-violet-400/25 transition-colors pointer-events-none"></div>
            `;

            grid.appendChild(card);
        });
    }

    // ── Open pack in lightbox ───────────────────────────────
    function _openPackDetail(pack) {
        Lightbox.open({
            dataUrl:  pack.img,
            prompt:   pack.desc,
            title:    `${pack.title} — ${pack.subtitle}`,
            tags:     [],
            model:    null,
            isStore:  true,
            price:    pack.price
        });
    }

    return { render };
})();
