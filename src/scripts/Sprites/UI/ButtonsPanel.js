import ObjectLinks from "../../Core/ObjectLinks";
import Sprite from "../../Core/Sprite";
import { OBJECTS } from "../../const";
import Button from "./Button";

export default class ButtonsPanel extends Sprite {
    setup() {
        super.setup();
        
        this.onResize();

        this.app = ObjectLinks.get(OBJECTS.app);
    }

    onResize() {
        this.setPosition({x: document.body.clientWidth - 300});
    }

    toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    soundOn() {
      this.soundOffButton.hide();
      this.soundOnButton.show();

      /* sounds start implementation (with pixi-sound, for example) */
    }

    soundOff() {
      this.soundOffButton.show();
      this.soundOnButton.hide();

      /* sounds stop implementation (with pixi-sound, for example) */
    }

    pauseGame() {
      let fade = ObjectLinks.get(OBJECTS.fade);
      if (!this.app.controller.started)
        return;
      if (this.paused) {
        this.paused = false;
        fade.hide();

        this.app.controller.startInteractive();
      } else {
        this.paused = true;
        fade.show();

        this.app.controller.stopInteractive();
      }
    }

    getDefaultConfig(config) {
        return Object.assign(super.getDefaultConfig(config), {
          scale: {x: .75, y: .75},
            sprites: [
              {
                class: Button,
                btnName: 'fullscreen',
                onClickFunc: this.toggleFullscreen
              },
              {
                name: 'soundOffButton',
                class: Button,
                btnName: 'sound_0',
                visible: false,
                position: {x: 128},
                onClickFunc: this.soundOn.bind(this)
              },
              {
                name: 'soundOnButton',
                class: Button,
                btnName: 'sound_1',
                position: {x: 128},
                onClickFunc: this.soundOff.bind(this)
              },
              {
                class: Button,
                btnName: 'pause',
                position: {x: 256},
                onClickFunc: this.pauseGame.bind(this)
              }
            ]
        })
        }
}