import { Text } from "pixi.js";
import Sprite from "../../Core/Sprite";
import { EVENTS, OBJECTS } from "../../const";

const TEXT_CONFIG = {
    fontFamily: 'ZubiloBlack',
    fontSize: 52,
    lineHeight: 66,
    fill: 0xffffff,
    align: 'center',
}

export default class CoinsPanel extends Sprite {
    setup() {
        super.setup();

        this.app.eventEmitter.on(EVENTS.onFontsLoaded, this.onFontsLoaded.bind(this));
    }

    onFontsLoaded() {
        this.setupCounter();
    }

    setupCounter() {
        let counter = new Text(0, TEXT_CONFIG)
        counter.anchor.set(.5);

        this.counter.addChild(counter);
    }

    getDefaultConfig(config) {
        return Object.assign(super.getDefaultConfig(config), {
            sprites: [
                {
                    image: './src/assets/UI/coin_score_plate.png',
                    position: {x: 64, y: 12}
                },
                {
                    name: 'counter',
                    linkID: OBJECTS.coinsCounter,
                    position: {x: 164, y: 48}
                },
                {
                    image: './src/assets/UI/collect_coin_icon.png'
                }
            ]
        })
        }
}