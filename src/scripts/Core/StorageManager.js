const STORAGE_NAME = 'bunny-game-progress'

class StorageManager {
    constructor() {
        
    }

    getAll() {
        return JSON.parse(localStorage.getItem(STORAGE_NAME)) || {};
    }
    
    getRecord() {
        return JSON.parse(localStorage.getItem(STORAGE_NAME)).record || 0;
    }
    
    getUsername() {
        return JSON.parse(localStorage.getItem(STORAGE_NAME)).username || "";
    }

    save(data) {
        let savedData = this.getAll();
        savedData = Object.assign(savedData, data);
        localStorage.setItem(STORAGE_NAME, JSON.stringify(savedData));
    }
}

export default new StorageManager()  