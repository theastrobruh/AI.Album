# AI.Album

> **by theAstroBruh**

A premium, offline-first AI image & prompt manager that feels like a fantasy card game.  
Store your AI generations with full metadata, filter by tags, and never lose a prompt again.

---

## ✦ Features

| Feature | Details |
|---|---|
| 🃏 **Fantasy Card Gallery** | Rounded cards with hover-zoom effect — click to open in fullscreen |
| 👤 **Multi-Profile Support** | Create, switch, or delete profiles on launch — session remembered |
| 🔖 **Tag System** | Label entries with `Tools`, `Modeling`, `Architecture`, `Design`, etc. |
| ⚙️ **Full Generation Metadata** | Model, VAE, Negative Prompt, Steps, CFG, Seed, Sampler |
| ⭐ **4 Built-in Prompts** | Re-Gen/Upscale, Outpaint, Face Portrait, Full Body — seeded automatically |
| 💾 **Save & Load Game** | Export/Import your entire album as JSON — no server needed |
| 🛡️ **Backup Reminders** | Notified every 3 days to export your data |
| 🛒 **Mini-Store** | 6 themed prompt packs (displayed as cards, same design language) |
| 🌌 **Live Starfield BG** | Animated canvas background with blinking stars and shooting stars |

---

## 🗂️ Project Structure

```
AI.Album/
├── index.html                  ← Entry point (pure HTML shell)
├── css/
│   └── main.css                ← All custom styles & CSS animations
├── js/
│   ├── app.js                  ← Bootstrap, shared state, tab logic
│   ├── core/
│   │   ├── db.js               ← IndexedDB wrapper (all DB calls)
│   │   ├── toast.js            ← Notification system
│   │   └── starfield.js        ← Canvas background animation
│   ├── data/
│   │   ├── builtins.js         ← 4 built-in free prompts (static data)
│   │   └── store-packs.js      ← Mini-Store pack definitions
│   └── modules/
│       ├── profiles.js         ← Profile CRUD + session management
│       ├── gallery.js          ← Gallery grid + card factory
│       ├── lightbox.js         ← Fullscreen viewer + generation pill
│       ├── modal.js            ← Add/Edit entry form
│       ├── store.js            ← Mini-Store rendering
│       ├── tags.js             ← Tag filter bar + chip selector
│       └── backup.js           ← Export / Import logic
└── assets/
    └── packs/                  ← Cover images for store packs (.webp)
        ├── mockups.webp
        ├── tshirt.webp
        ├── architecture.webp
        ├── igmodel.webp
        ├── influencer.webp
        └── allinone.webp
```

---

## 🚀 Getting Started

1. **Clone or download** this repository.
2. **Add your cover images** to `assets/packs/` (`.webp` format, see names above).
3. **Open `index.html`** directly in any modern browser — no build step, no server required.
4. Create a profile and start adding your AI generations!

> **Note:** The app uses **IndexedDB** for storage (images + prompts live in your browser).  
> Use **Save Game (Export)** regularly to back up your data as JSON.

---

## 💾 Data & Privacy

- **100% offline** — no data is sent to any server.
- All images and prompts are stored in your browser's **IndexedDB**.
- Export your data at any time from the backup menu (↓ icon in the navbar).
- Importing replaces the current profile's data with the backup file.

---

## 🛒 Mini-Store Packs

| Pack | Price |
|---|---|
| Pack #1 — Mock Ups | \$4.99 |
| Pack #2 — T-shirt Design | \$4.99 |
| Pack #3 — Architecture & Environments | \$4.99 |
| Pack #4 — IG Model | \$9.99 |
| Pack #5 — Digital Influencer | \$9.99 |
| Pack #6 — All in One | \$24.99 |

---

## ⭐ Built-in Free Prompts

| # | Name | Tags |
|---|---|---|
| 1 | Re-Gen / Upscale | Tools, Upscaling |
| 2 | Outpaint | Tools, Outpaint |
| 3 | Face Portrait (BLACK BG) | Modeling, Portrait |
| 4 | Full Body (BLACK BG) | Modeling, Full Body |

---

## 🏷️ Available Tags

`Tools` · `Marketing` · `Modeling` · `Architecture` · `Design` · `Upscaling` · `Outpaint` · `Portrait` · `Full Body` · `Concept Art` · `Illustration` · `Misc`

---

## 📄 License

Personal use. All rights reserved — theAstroBruh.
