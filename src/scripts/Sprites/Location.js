import ObjectLinks from "../Core/ObjectLinks";
import Sprite from "../Core/Sprite";
import { OBJECTS } from "../const";
import Background from "./Background";

export default class extends Sprite {
    setup() {
        super.setup();

        this.app = ObjectLinks.get(OBJECTS.app);

        this.app.gameTicker.add(this.moveBackground.bind(this));
    }

    moveBackground() {
        if (this.bg.position.x > -640)
            this.bg.position.x -= .1
        else
            this.bg.position.x = 0
    }

    getDefaultConfig(config) {
      return Object.assign(super.getDefaultConfig(config), {
          sprites: [
            {
                name: 'bg',
                class: Background
            },
            {
                image: './src/assets/Environment/bg_sun.png',
                position: {x: 284, y: -32}
            },
            {
                name: 'objects'
            }
          ]
      })
      }
  }