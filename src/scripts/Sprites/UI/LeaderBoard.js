import { Ticker } from "pixi.js";
import LocalizationManager from "../../Core/LocalizationManager";
import ObjectLinks from "../../Core/ObjectLinks";
import { OBJECTS } from "../../const";
import Button from "./Button";
import Panel from "./Panel";

const TEXT_CONFIG = {
    fontFamily: 'ZubiloBlack',
    fontSize: 58,
    lineHeight: 72,
    fill: 0xff6801,
    align: 'center',
}

const HEADER_TEXT_CONFIG = Object.assign({}, TEXT_CONFIG, {
    fill: 0x003d71,
    fontSize: 54,
    lineHeight: 68,
});


const LIST_NUMBERS_TEXT_CONFIG = Object.assign({}, TEXT_CONFIG, {
    fill: 0xffffff,
    fontSize: 42,
    lineHeight: 56,
});

const lists = ['all_time', 'month', 'week'];

export default class LeaderBoard extends Panel {
    setup() {
        super.setup();

        this.currentList = 0;
    }

    onFontsLoaded() {
        this.addTexts();
    }

    addTexts() {
        let header = this.createText(`${LocalizationManager.getText("records_table")}:`, HEADER_TEXT_CONFIG);
        let loadingText = this.createText(`${LocalizationManager.getText("loading")}...`, HEADER_TEXT_CONFIG);
        let listName = this.createText(this.getListName(), TEXT_CONFIG);
        header.position.y = -12;
        listName.position.y = -12;

        this.listName.addChild(listName);
        this.loading.addChild(loadingText);
        this.header.addChild(header);

        this.addNumsToList();
    }

    open() {
        this.currentList = 0;

        this.updateListName();
        this.updateList();
        
        this.show();
    }

    getPrevList() {
        this.currentList = (3 + (--this.currentList))%3;

        this.updateListName(lists[this.currentList]);
        this.updateList();
    }

    getNextList() {
        this.currentList = (++this.currentList)%3;

        this.updateListName(lists[this.currentList]);
        this.updateList();
    }

    updateListName() {
        this.listName.children[0].text = this.getListName();
    }

    getListName() {
        return LocalizationManager.getText(lists[this.currentList]);
    }

    updateList() {
        this.hideAllRows();
        this.loading.show();
        this.fillTable().then(() => {
            this.loading.hide();
            this.showListAnimation();
        });
    }

    showListAnimation() {
        if (this.ticker && this.ticker.started) {
            this.ticker.destroy();
            this.hideAllRows();
        }

        let counter = 0;
        this.ticker = new Ticker();

        this.ticker.add(dt => {
            if (!(counter%100)) {
                let idx = Math.floor(counter/100);
                this.list.children[idx].show();

                if (idx == this.list.children.length - 1)
                    this.ticker.destroy();
            }
            counter += 20;
        });

        this.ticker.start();
    }

    hideAllRows() {
        this.list.children.forEach(child => child.hide());
    }

    addNumsToList() {
        this.list.children.forEach(child => {
            if (child.config.placeNumber > 3) {
                let num = this.createText(child.config.placeNumber, LIST_NUMBERS_TEXT_CONFIG);
                num.position.x = 46;
                child.addChildAt(num, 0)
            }
        })
    }

    fillTable() {
        return new Promise(resolve =>
        this.loadData().then(data => {
            // TODO: fill the table

            resolve();
        }));
    }

    loadData() { // TODO: get data from server
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    openStartPanel() {
        this.hide();
        ObjectLinks.get(OBJECTS.startPanel).show();
    }

    getList() {
        let listSprites = [];
        for (let idx = 0; idx < 10; idx++) {
            listSprites.push({
                name: `place_${idx + 1}`,
                placeNumber: idx + 1,
                position: (idx < 3) ? {x: 0, y: idx*82} : {x: 0, y: (3*78) + (idx - 3)*46},
                sprites: [
                    {
                        name: 'username',
                        anchor: {x: 0, y: .5},
                        image: idx < 3 ? `./src/assets/UI/place_${idx + 1}.png` : './src/assets/UI/midleader_name_plate.png',
                        position: (idx < 3) ? {x: 8, y: 0} : {x: 72, y: 0} ,
                    },
                    {
                        name: 'score',
                        anchor: {x: 0, y: .5},
                        position: (idx < 3) ? {x: 516} : {x: 524},
                        image: idx < 3 ? `./src/assets/UI/highleader_scores_plate.png` : './src/assets/UI/midleader_scores_plate.png'
                    }
                ]
            })
        }

        return listSprites;
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
                    name: 'btnPrev',
                    class: Button,
                    position: {x: 128, y: 104},
                    anchor: {y: .5},
                    btnName: 'arrow',
                    scale: {x: -1},
                    onClickFunc: this.getPrevList.bind(this)
                },
                {
                    name: 'listName',
                    position: {x: 376, y: 152}
                },
                {
                    name: 'loading',
                    position: {x: 376, y: 450},
                    visible: false
                },
                {
                    name: 'btnNext',
                    class: Button,
                    position: {x: 612, y: 104},
                    anchor: {y: .5},
                    btnName: 'arrow',
                    onClickFunc: this.getNextList.bind(this)
                },
                {
                    name: 'list',
                    position: {x: 24, y: 216},
                    sprites: this.getList()
                },
                {
                    class: Button,
                    position: {x: 269, y: 758},
                    btnName: 'ok',
                    onClickFunc: this.openStartPanel.bind(this)
                }
            ]
        })
        }
}