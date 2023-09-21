import Sprite from "../../Core/Sprite";
//import Animation from "../../Core/Animation";

export default class Star extends Sprite {
    setup() {
        super.setup();
        
        this.animate();
    }

    animate() {
        // Animation.create(this, {
        //     to: {
        //         rotation: Math.random()*.25
        //     },
        //     time: Math.random() * 1000,
        //     pingPong: true,
        //     autoStart: true,
        //     loop: true
        // })
    }

    getDefaultConfig(config) {
        return Object.assign(super.getDefaultConfig(config), {
            anchor: {x: .5, y: .5},
            image: './src/assets/UI/star.png',
            /*sprites: [
                {
                    image: './src/assets/UI/star.png',
                }
            ]*/
        })
        }
}