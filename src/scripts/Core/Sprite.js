import * as PIXI from 'pixi.js';
import ObjectLinks from './ObjectLinks';
import { OBJECTS, EVENTS } from '../const';

export default class Sprite extends PIXI.Sprite {
    constructor(config) {
        super()

        this.config = Object.assign(this.getDefaultConfig(config), config);

        this.setup();
    }

    setup() {
        this.on('childAdded', this.linkChild);
        this.setupPIXIAttributes();
        this.setupTexture();
        this.setupLinks();
        this.createSprites();

        this.origPosition = new PIXI.Point();
        this.setPosition(this.config.position);

        this.locked = this.config.locked;

        this.app = ObjectLinks.get(OBJECTS.app);

        this.app.eventEmitter.on(EVENTS.onResize, this.onResize.bind(this));
        this.app.eventEmitter.on(EVENTS.restart, this.restart.bind(this));
    }

    onResize() {}

    restart() {}

    setPosition(position) {
        Object.assign(this.origPosition, position)

        this.position = this.origPosition
    }

    setupLinks() {
        this.config.hasOwnProperty('linkID') && ObjectLinks.set(this.config.linkID, this)
    }

    setupPIXIAttributes() {
        Object.assign(this.anchor, this.config.anchor);
        Object.assign(this.scale, this.config.scale);
        Object.assign(this.pivot, this.config.pivot);
        Object.assign(this.skew, this.config.skew);

        this.alpha = this.config.alpha;
        this.config.rotation !== undefined && (this.rotation = this.config.rotation);
        this.config.angle !== undefined && (this.angle = this.config.angle);
        this.visible = this.config.visible;
        this.interactive = this.config.interactive;
    }

    createSprites() {
        this.config.sprites.forEach(config => {
            this.addChild(config.class ? new config.class(config) : new Sprite(config));
        });
    }

    linkChild(obj) {
        (obj.config && obj.config.name) && (this[obj.config.name] = obj);
    }

    setupTexture() {
        if (!this.config.image) {
            this.setOrigSize(this.config.origWidth, this.config.origHeight);

            return;
        }

       
        this.setTexture(PIXI.Texture.from(this.config.image))
    }

    setTexture(texture) {
        this.texture = texture;

        this.setOrigSize(this.texture.origWidth, this.texture.origHeight);
    }

    setOrigSize(origWidth, origHeight) {
        this.origWidth  = origWidth;
        this.origHeight = origHeight
    }
    
    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    getDefaultConfig(config) {
        return {
            alpha: 1,
            anchor: {x: 0, y: 0},
            pivot: {x: 0, y: 0},
            scale: {x: 1, y: 1},
            visible: true,
            interactive: false,
            origWidth: 0,
            origHeight: 0,
            locked: false,
            sprites: []
        }
    }
}