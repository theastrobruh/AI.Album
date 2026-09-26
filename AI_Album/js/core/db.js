/**
 * js/core/db.js
 * IndexedDB wrapper — all database interactions live here.
 * Exposed via the global `DB` object.
 */

const DB = (() => {
    const NAME    = 'AIAlbumDB';
    const VERSION = 2;
    let _db       = null;

    // ── Open / upgrade ──────────────────────────────────────
    function open() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(NAME, VERSION);

            req.onupgradeneeded = e => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('profiles')) {
                    db.createObjectStore('profiles', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('images')) {
                    const imgStore = db.createObjectStore('images', { keyPath: 'id' });
                    imgStore.createIndex('profileId', 'profileId', { unique: false });
                }
            };

            req.onsuccess = e => { _db = e.target.result; resolve(_db); };
            req.onerror   = e => reject(e.target.error);
        });
    }

    // ── Generic helpers ──────────────────────────────────────
    const tx   = (store, mode) => _db.transaction(store, mode).objectStore(store);

    function put(store, item) {
        return new Promise((r, j) => {
            const s = tx(store, 'readwrite');
            s.put(item).onsuccess = () => r();
            s.transaction.onerror = () => j(s.transaction.error);
        });
    }

    function add(store, item) {
        return new Promise((r, j) => {
            const s = tx(store, 'readwrite');
            s.add(item).onsuccess = () => r();
            s.transaction.onerror = () => j(s.transaction.error);
        });
    }

    function get(store, key) {
        return new Promise((r, j) => {
            tx(store, 'readonly').get(key).onsuccess = e => r(e.target.result);
        });
    }

    function getAll(store) {
        return new Promise((r, j) => {
            tx(store, 'readonly').getAll().onsuccess = e => r(e.target.result);
        });
    }

    function del(store, key) {
        return new Promise((r, j) => {
            const s = tx(store, 'readwrite');
            s.delete(key).onsuccess = () => r();
            s.transaction.onerror = () => j(s.transaction.error);
        });
    }

    /** Delete all records matching an index value */
    function delByIndex(store, indexName, val) {
        return new Promise((r, j) => {
            const transaction = _db.transaction(store, 'readwrite');
            const index = transaction.objectStore(store).index(indexName);
            index.openCursor(IDBKeyRange.only(val)).onsuccess = ev => {
                const cursor = ev.target.result;
                if (cursor) { cursor.delete(); cursor.continue(); }
            };
            transaction.oncomplete = r;
            transaction.onerror    = () => j(transaction.error);
        });
    }

    /** Get all records matching an index value */
    function getByIndex(store, indexName, val) {
        return new Promise((r, j) => {
            tx(store, 'readonly')
                .index(indexName)
                .getAll(IDBKeyRange.only(val))
                .onsuccess = e => r(e.target.result);
        });
    }

    return { open, put, add, get, getAll, del, delByIndex, getByIndex };
})();
