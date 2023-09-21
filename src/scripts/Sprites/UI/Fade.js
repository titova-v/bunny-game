import { Graphics } from "pixi.js";
import Sprite from "../../Core/Sprite";

export default class Fade extends Sprite {
  setup() {
    super.setup();

    this.addChildAt(this.createGraphics(), 0);
  }

  createGraphics() {
    let g = new Graphics();

    g.beginFill(this.config.fillColor, this.config.fillAlpha);
    g.drawRect(0, 0,document.body.clientWidth, document.body.clientHeight);

    return g
  }

  onResize() {
    this.removeChild(this.children[0])

    this.addChildAt(this.createGraphics(), 0);
  }

  getDefaultConfig(config) {
    return Object.assign(super.getDefaultConfig(config), {
      fillColor: 0x0,
      fillAlpha: 0.6,
      interactive: true,
      visible: false
    })
  }
}