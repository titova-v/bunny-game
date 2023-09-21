import { STRINGS } from "../strings";
const DEFAULT = 'en';

class LocalizationManager {
    constructor() {
        this.lang = navigator.language.split('-')[0] || DEFAULT
    }

    getText(name) {
        return STRINGS[name][this.lang] || STRINGS[name][DEFAULT]
    }
}

export default new LocalizationManager();