import { Text, Ticker } from "pixi.js";
import LocalizationManager from "../Core/LocalizationManager";
import ObjectLinks from "../Core/ObjectLinks";
import Sprite from "../Core/Sprite"
import { OBJECTS } from "../const";

const JUMP_HEIGHT = 132;
const JUMP_DELAY_TOP = 12

const TEXT_CONFIG = {
    fontFamily: 'ZubiloBlack',
    fontSize: 42,
    lineHeight: 56,
    fill: 0x000000,
    align: 'center'
}

export default class Hero extends Sprite {
    setup() {
        super.setup();

        this.app = ObjectLinks.get(OBJECTS.app);

        this.addDistance();

        this.reset();
    }

    reset() {
        this.jumpSpeed = 1;
        this.jumping = false;
    }

    restart() {
        this.setPosition(this.config.position);
        this.reset();
    }

    addDistance() {
        this.distanceMetric = LocalizationManager.getText("metre");
        this.distance = new Text(`0${this.distanceMetric}`, TEXT_CONFIG);
        this.distance.anchor.set(.5);

        this.distanceView.addChild(this.distance);
    }

    jump() {
        if (this.jumping) {
            this.direction = -1;
            this.jumpSpeed = 2;

            return;
        }

        this.direction = 1;
        const startPosY = this.position.y;
        const jumpY = startPosY - JUMP_HEIGHT;
        let topCouter = 0;

        this.app.heroTicker = new Ticker();

        this.app.heroTicker.add(dt => {
            if (!this.jumping)
            return;
        if (this.direction > 0 && this.position.y > jumpY) {
            this.position.y -= 8*this.jumpSpeed;
        }
        else if (this.direction > 0 && this.position.y <= jumpY) {
            if (topCouter < JUMP_DELAY_TOP)
                topCouter++;
            else {
                this.direction = -1;
                this.jumpSpeed = .6;
            }
        } else if (this.direction < 0 && (this.position.y + 8*this.jumpSpeed) < startPosY) {
            this.position.y += 8*this.jumpSpeed;
        } else if (this.direction < 0 && (this.position.y + 8*this.jumpSpeed) >= startPosY) {
            this.position.y = startPosY;
            this.direction = 0;
            this.jumping = false;
            this.jumpSpeed = 1;
            this.app.heroTicker.destroy();
        }
        });

        this.app.heroTicker.start();
        this.jumping = true;
    }

    updateDistance(distance) {
        this.distance.text = `${distance}${this.distanceMetric}`;
    }

    getDefaultConfig(config) {
        return Object.assign(super.getDefaultConfig(config), {
            position: {y: 408},
            sprites: [
                {
                    scale: {x: .35, y: .35},
                    image: './src/assets/mi_bunny_idle.png'
                },
                {
                    name: 'distanceView',
                    position: {x: 87, y: 178}
                }
            ]
        })
        }
}