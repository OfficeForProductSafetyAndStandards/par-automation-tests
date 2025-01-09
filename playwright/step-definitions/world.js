const {setWorldConstructor} = require('@cucumber/cucumber');
const clc = require('cli-color');

class CustomWorld {
    constructor({attach}) {
        this.attachScreenshot = attach;
        this.dataStore = {};
    }

    setDataStore(name, data) {
        this.dataStore[name] = data;
    }

    getDataStore(name) {
        return this.dataStore[name];
    }

    getAllDataStore() {
        return this.dataStore;
    }

    removeDataStore(name) {
        delete this.dataStore[name];
    }

    clearAllDataStores() {
        const allDataStores = Object.keys(this.dataStore);
        console.log('=====> ' + clc.blue(`%%%%%% Clearing scenario's dataStores: ${allDataStores.join(', ')}`));
        allDataStores.forEach(name => {
            this.removeDataStore(name);
        });
    }
}

setWorldConstructor(CustomWorld);

module.exports = new CustomWorld({});
