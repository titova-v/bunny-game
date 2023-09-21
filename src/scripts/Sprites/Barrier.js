import Sprite from "../Core/Sprite";

export default class Barrier extends Sprite {
    crush() {
        this.idle.hide();
        this.crushed.show();
    }

    getDefaultConfig(config) {
        return Object.assign(super.getDefaultConfig(config), {
            scale: {x: .5, y: .5},
            sprites: [
                {
                    name: 'idle',
                    image: './src/assets/Environment/stopper_idle.png'
                },
                {
                    name: 'crushed',
                    image: './src/assets/Environment/stopper_crush.png',
                    visible: false
                }
            ]
        });
    }
}