import ObjectLinks from "../../Core/ObjectLinks";
import LocalizationManager from "../../Core/LocalizationManager";
import { EVENTS, MI_BUNNY_OAUTH_LINK, OBJECTS } from "../../const";
import Button from "./Button";
import Panel from "./Panel";

const TEXT_CONFIG = {
    fontFamily: 'ZubiloBlack',
    fontSize: 50,
    lineHeight: 64,
    fill: 0x003d71,
    align: 'center',
}

const USERNAME_TEXT_CONFIG = Object.assign({}, TEXT_CONFIG, {
    fill: 0xffffff,
    align: 'left'
});

const RECORD_TEXT_CONFIG = Object.assign({}, TEXT_CONFIG, {
    fontSize: 60,
    lineHeight: 74,
    fill: 0x00fd17
});

export default class StartPanel extends Panel {
    setup() {
        super.setup();

        this.app = ObjectLinks.get(OBJECTS.app);
    }

    onFontsLoaded() {
        this.addHeaders();
    }

    addHeaders() {
        let header = this.createText(`${LocalizationManager.getText("your_records")}:`, TEXT_CONFIG);
        let record = this.createText(`${LocalizationManager.getText("record")}:`, RECORD_TEXT_CONFIG);

        header.position.y = -12;

        this.header.addChild(header);
        this.record.text.addChild(record);
    }

    updateData(data) {
        let username = this.createText(data.username, USERNAME_TEXT_CONFIG);
        let record = this.createText(data.record, RECORD_TEXT_CONFIG);

        this.username.addChild(username);
        this.record.count.addChild(record);
    }

    openLeaderBoard() {
        ObjectLinks.get(OBJECTS.leadBoard).open();

        this.hide();
    }

    playGame() {
       this.app.controller.goToStart();
       this.hide();
    }

    redirect() {
        window.open(MI_BUNNY_OAUTH_LINK, "_self");
    }

    getDefaultConfig(config) {
        return Object.assign(super.getDefaultConfig(config), {
            sprites: [
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
                    name: 'record',
                    position: {x: 376, y: 148},
                    sprites: [
                        {
                            name: 'text',
                        },
                        
                        {
                            name: 'count',
                            position: {y: 64}
                        }
                    ]
                },
                {
                    class: Button,
                    position: {x: 213, y: 308},
                    btnName: 'login',
                    onClickFunc: this.redirect
                },
                {
                    name: 'username',
                    image: './src/assets/UI/user_name_bar.png',
                    anchor: {x: .5, y: .5},
                    position: {x: 376, y: 568}
                },
                {
                    class: Button,
                    position: {x: 48, y: 668},
                    btnName: 'leadboard',
                    onClickFunc: this.openLeaderBoard.bind(this)
                },
                {
                    class: Button,
                    position: {x: 370, y: 668},
                    btnName: 'play',
                    onClickFunc: this.playGame.bind(this)
                }
            ]
        })
        }
}