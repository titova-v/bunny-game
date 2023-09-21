import { Text } from "pixi.js";
import Sprite from "../../Core/Sprite";
import { EVENTS, SIZES } from "../../const";

export default class Panel extends Sprite {
    setup() {
        super.setup();

        this.onResize();
        this.app.eventEmitter.on(EVENTS.onFontsLoaded, this.onFontsLoaded.bind(this));
    }

    onFontsLoaded() {}

    onResize() {
        this.setPosition({x: .5*(document.body.clientWidth - SIZES.panel.x*this.scale.x), y: .5*(document.body.clientHeight - SIZES.panel.y*this.scale.y)});
    }

    createText(text, config) {
        let txt = new Text(text, config);
        txt.anchor.set(.5);

        return txt
    }

    getDefaultConfig(config) {
        return Object.assign(super.getDefaultConfig(config), {
            scale: {x: .75, y: .75}
        });
    }
}