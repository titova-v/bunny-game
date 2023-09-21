import Button from "./Button";
import Star from "./Star";
import ObjectLinks from "../../Core/ObjectLinks";
import { OBJECTS } from "../../const";
import LocalizationManager from "../../Core/LocalizationManager";
import Panel from "./Panel";

const TEXT_CONFIG = {
    fontFamily: 'ZubiloBlack',
    fontSize: 58,
    lineHeight: 72,
    fill: 0x003d71,
    align: 'center'
}

const COINS_TEXT_CONFIG = Object.assign({}, TEXT_CONFIG, {
    fontSize: 98,
    lineHeight: 112,
    fill: 0xf4ad25
})

const DISTANCE_TEXT_CONFIG = Object.assign({}, COINS_TEXT_CONFIG, {
    fill: 0x9ac6ff
})

const SCORE_TEXT_CONFIG = Object.assign({}, TEXT_CONFIG, {
    fontSize: 148,
    lineHeight: 162,
    fill: 0x00cc00
});

export default class ScorePanel extends Panel {
    setup() {
        super.setup();

        this.app = ObjectLinks.get(OBJECTS.app);
    }

    restart() {
        this.score.removeChildren();
        this.distance.text.removeChildren();
        this.coins.text.removeChildren();
        this.header.removeChildren();
    }

    open(data) {
        this.updateProgress(data);
        this.show();

        if (data.newRecord) {
            this.startEffectsAnimation();
            this.rays.show();
            this.stars.show();
        }
    }

    updateProgress({distance, score, coins, newRecord}) {
        this.addHeader(newRecord ? "new_record" : "your_points");
        this.addCoinsCount(coins);
        this.addScore(score);
        this.addDistance(distance);
    }

    startEffectsAnimation() {
        this.app.ticker.add(delta => this.rays.rotation += 0.01 * delta);

        this.startStarAnimation();
    }

    startStarAnimation() {
        this.stars.children.forEach(child => {
            child.direction = Math.sign(Math.random() - .5);
            child.speed = .002 + .003*Math.random();
            child.maxAngle = .1 + .15*Math.random();
            this.app.ticker.add(delta => {
                if (child.direction > 0 && child.rotation < child.maxAngle) {
                    child.rotation += child.speed * delta;
                }
                else if (child.direction > 0 && child.rotation > child.maxAngle){
                    child.direction = -1;
                } else if (child.direction < 0 && child.rotation > -child.maxAngle) {
                    child.rotation -= child.speed * delta;
                } else if (child.direction < 0 && child.rotation < -child.maxAngle){
                    child.direction = 1;
                }
            });
        });
    }

    addHeader(stringName) {
        let string = this.createText(`${LocalizationManager.getText(stringName)}:`, TEXT_CONFIG);
        string.position.y = -12;

        this.header.addChild(string);
    }

    addScore(count) {
        let string = this.createText(count, SCORE_TEXT_CONFIG)

        this.score.addChild(string);
    }

    addCoinsCount(count) {
        let string = this.createText(count, COINS_TEXT_CONFIG)

        this.coins.text.addChild(string);
    }

    addDistance(count) {
        let string = this.createText(`${count} ${LocalizationManager.getText("metre")}`, DISTANCE_TEXT_CONFIG)

        this.distance.text.addChild(string);
    }

    createStars() {
        return [
            {
                class: Star,
                position: {x: -448, y: -342},
                scale: {x: .75, y: .75}
            },
            {
                class: Star,
                position: {x: 448, y: -342},
                scale: {x: .75, y: .75}
            },
            {
                class: Star,
                position: {x: -482, y: -128},
                scale: {x: .5, y: .5}
            },
            {
                class: Star,    
                position: {x: 482, y: -128},
                scale: {x: .5, y: .5}
            },
            {
                class: Star,
                position: {x: -502, y: 64}
            },
            {
                class: Star,
                position: {x: 502, y: 64}
            },
            {
                class: Star,
                position: {x: -462, y: 302},
                scale: {x: .75, y: .75}
            },
            {
                class: Star,
                position: {x: 462, y: 302},
                scale: {x: .75, y: .75}
            }
        ]
    }

    openLeaderBoard() {
        ObjectLinks.get(OBJECTS.leadBoard).open();
        
        this.hide();
    }

    getDefaultConfig(config) {
        return Object.assign(super.getDefaultConfig(config), {
            sprites: [
                {
                    name: 'rays',
                    image: './src/assets/UI/rays.png',
                    position: {x: 370, y: 460},
                    pivot: {x: 820, y: 820},
                    visible: false
                },
                {
                    name: 'stars',
                    position: {x: 378, y: 448},
                    sprites: this.createStars(),
                    visible: false
                },
                {
                    image: './src/assets/UI/info_plate_big.png'
                },
                {
                    name: 'header',
                    image: './src/assets/UI/header_info_plate.png',
                    anchor: {x: .5, y: .5},
                    position: {x: 376, y: 56}
                },
                {
                    name: 'score',
                    position: {x: 364, y: 198}
                },
                {
                    name: 'coins',
                    position: {x: 112, y: 350},
                    sprites: [
                        {
                            image: './src/assets/UI/collect_coin_icon.png'
                        },
                        {
                            name: 'text',
                            position: {x: 298, y: 42}
                        }
                    ]    
                },
                {
                    name: 'distance',
                    position: {x: 112, y: 508},
                    sprites: [
                        {
                            image: './src/assets/UI/collect_distance_icon.png'
                        },
                        {
                            name: 'text',
                            position: {x: 298, y: 64}
                        }
                    ]
                },
                {
                    class: Button,
                    position: {x: 269, y: 758},
                    btnName: 'ok',
                    onClickFunc: this.openLeaderBoard.bind(this)
                }
            ]
        })
        }
}