import Sprite from "../Core/Sprite";
import { OBJECTS, SIZES } from "../const";
import ObjectLinks from "../Core/ObjectLinks";
import Barrier from "./Barrier";

export default class extends Sprite {
    setup() {
        super.setup();

        this.app = ObjectLinks.get(OBJECTS.app);

        this.app.gameTicker.add(this.moveGround.bind(this));
    }

    moveGround() {
        let groundWidth = SIZES.floor.x;
        let dx = 10;
        let dy = groundWidth*Math.sin(this.floor.rotation)/groundWidth*dx;
        if (this.floor.position.x > -(groundWidth-dx)) {
            this.floor.position.x -= dx;
            this.floor.position.y -= dy;
        } else {
            this.floor.position = {x: 0, y: 548};
        }

        this.barriers.position.x -= dx;
        this.barriers.position.y -= dy;
    }

    createBarrier(pos) {
        this.barriers.addChild(new Barrier({
            position: pos //{x: 600, y: -72}
        }));
    }

    getDefaultConfig(config) {
      return Object.assign(super.getDefaultConfig(config), {
        linkID: OBJECTS.track,
        sprites: [
            {
                name: 'barriers',
                position: {y: 548},
                rotation: .09
            },
            {
                name: 'floor',
                position: {y: 548},
                rotation: .09,
                sprites: [
                    {
                        image: './src/assets/Environment/floor.png',
                    },   
                    {
                        image: './src/assets/Environment/floor.png',
                        position: {x: 1280}
                    },   
                    {
                        image: './src/assets/Environment/floor.png',
                        position: {x: 2560}
                    }
                ]
            }
          ]
      })
      }
  }