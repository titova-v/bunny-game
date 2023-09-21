import Sprite from "../../Core/Sprite";
import Fade from "./Fade";

export default class Intro extends Sprite {
    setup() {
        super.setup();

        this.onResize();
    }

    onResize() {
        this.bunny.setPosition({x: document.body.clientWidth* .5, y: document.body.clientHeight* .5});
    }

    getDefaultConfig(config) {
        return Object.assign(super.getDefaultConfig(config), {
            sprites: [
                {
                    class: Fade,
                    fillColor: 0x91c5fd,
                    fillAlpha: 1,
                    visible: true
                },
                {
                    name: 'bunny',
                    image: './src/assets/mi_bunny_idle.png',
                    anchor: {x: .5, y: .5},
                    scale: {x: .5, y: .5}
                }
            ]
        })
        }
}