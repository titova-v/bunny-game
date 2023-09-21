import Sprite from "../Core/Sprite";

export default class extends Sprite {
    getDefaultConfig(config) {
      return Object.assign(super.getDefaultConfig(config), {
          sprites: [
            {
                image: './src/assets/Environment/back_rocks.png',
                scale: {x: .5, y: .5},
                position: {y: 312}
            },
            {
                image: './src/assets/Environment/back_rocks.png',
                scale: {x: .5, y: .5},
                position: {x: 640, y: 312}
            },
            {
                image: './src/assets/Environment/back_rocks.png',
                scale: {x: .5, y: .5},
                position: {x: 1280, y: 312}
            },
            {
                image: './src/assets/Environment/back_rocks.png',
                scale: {x: .5, y: .5},
                position: {x: 1920, y: 312}
            }
          ]
      })
      }
  }