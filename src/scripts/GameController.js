import { EVENTS, OBJECTS, GAMEPLAY_CONFIG, SIZES } from "./const";
import ObjectLinks from "./Core/ObjectLinks";

const COIN_WEIGHT = 5;

export default class GameController {
    constructor(app) {
        this.app = app;

       window.onresize = this.onResize;

       this.app.gameTicker.add(this.update.bind(this));

       this.app.stage.on("pointerup", this.onClick.bind(this));

       this.hero = ObjectLinks.get(OBJECTS.hero);

       this.intro = ObjectLinks.get(OBJECTS.intro);
       this.track = ObjectLinks.get(OBJECTS.track);

       this.startPanel = ObjectLinks.get(OBJECTS.startPanel);
       this.scorePanel = ObjectLinks.get(OBJECTS.scorePanel);

       this.keyDownBindThis = this.onKeyDown.bind(this);
    }

    reset() {
        this.distance = 0;
        this.coins = 0;
        this.stopped = false;
    }

    onResize(event) {
       this.app.renderer.resize(window.innerWidth, window.innerHeight);
       this.app.emitEvent(EVENTS.onResize, event);
    }

    showStartPanel(data) {
        this.startPanel.updateData(data);
        this.startPanel.show();
    }

    goToStart() {
        this.distance > 0 && this.app.emitEvent(EVENTS.restart);

        this.reset();
        this.app.stage.interactive = true;

        window.document.addEventListener('keydown', this.keyDownBindThis);
    }

    start() {
        this.started = true;

        this.app.gameTicker.start();
    }

    stop() {
        this.stopInteractive();
    }

    gameOver() {
        this.stop();
        this.started = false;
        window.document.removeEventListener('keydown', this.keyDownBindThis);

        const coins = this.coins,
             distance = Math.floor(this.distance),
             score = this.calculatePoints({coins, distance}),
             newRecord = score > this.app.data.record;

             if (newRecord)
                this.app.saveData({record: score});

             this.scorePanel.open({coins, distance, score, newRecord});

    }

    update(dt) {
        this.distance += .1;

        this.hero.updateDistance(Math.floor(this.distance));

        const barrier = this.track.barriers.children.find(() => {}); // check collision

            if (barrier) {
                barrier.crush();
                this.gameOver();
            }

    }

    checkCollision() {}

    onKeyDown(event) {
        if (this.started && event.keyCode == 75) {
            this.gameOver();
            return;
        }
        if (event.repeat || event.keyCode != 32)
            return;
        
        this.onClick();
    }

    onClick() {
        if (this.stopped)
            return;

        if (this.started)
            this.hero.jump();
        else
            this.start();
    }

    startInteractive() {
        this.stopped = false;

        this.app.gameTicker.start();
        this.app.heroTicker && this.app.heroTicker.start();
    }

    stopInteractive() {
        this.stopped = true;

        this.app.gameTicker.stop();
        this.app.heroTicker && this.app.heroTicker.stop();
    }

    showIntro() {
        this.intro.show();
    }
    
    hideIntro() {
        this.intro.hide();
    }

    calculatePoints({coins, distance}) {
        return coins*COIN_WEIGHT + distance
    }
}