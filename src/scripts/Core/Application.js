import * as PIXI from 'pixi.js';
import Sprite from './Sprite';
import GameController from '../GameController';
import { EVENTS, OBJECTS, userName } from '../const';
import ObjectLinks from './ObjectLinks';
import StorageManager from './StorageManager';

export default class Application extends PIXI.Application {
    constructor(config) {
        super({
            background: '#1099bb',
            width: document.body.clientWidth,
            height: document.body.clientHeight
        });

        this.appendRenderView();
        
        this.addGameTicker();

        this.eventEmitter = new PIXI.utils.EventEmitter();

        this.setupLink();

        this.addSprites(config.sprites);

        this.setup(config);

        return this
    }

    setup() {
        this.initGameController();
        this.controller.showIntro();

        this.loadFonts().then(() => {
            this.emitEvent(EVENTS.onFontsLoaded);

            this.data = this.loadData();

            setTimeout(() => { // load some data from server
                this.controller.showStartPanel(this.data);
                this.controller.hideIntro();
            }, 2000);
        }).catch()
    }

    appendRenderView() {
        document.body.appendChild(this.view);
    }

    addGameTicker() {
        this.gameTicker = new PIXI.Ticker();
    }

    addSprites(sprites) {
        sprites.forEach(config => this.stage.addChild(config.class ? new config.class(config) : new Sprite(config)));
    }

    initGameController() {
        this.controller = new GameController(this);
    }

    emitEvent(event, ...args) {
        this.eventEmitter.emit(event, ...args)
    }

    setupLink() {
        ObjectLinks.set(OBJECTS.app, this)
    }

    loadData() {
        let data = StorageManager.getAll();

        if (data.username) {

        } else {
            data.username = `${userName}_${Math.floor(Math.random() * 1000)}`; // check free username id with server
            data.record = 0;
            this.saveData(data);
        }

        return data;
    }

    saveData(data) {
        StorageManager.save(data);

        this.updateData();
    }

    updateData() {
        this.data = this.loadData();
    }

    loadFonts() {
        return new Promise((resolve, reject) => {
            const fontFile = new FontFace(
                "ZubiloBlack",
                "url(./src/fonts/ZubiloBlack.woff)",
              );
          
              fontFile.load().then(font => {
                document.fonts.add(font);
                resolve(font);
            }).catch(resolve);
    });
    }
}