import Sprite from "../../Core/Sprite";

export default class Button extends Sprite {
    setup() {
        super.setup();

        this.interactive = true;

        this.on('pointerover', this.onHover);
        this.on('pointerdown', this.onPointerDown);
        this.on('pointerup', this.onClick);
        this.on('pointerout', this.onPointerOut);
        
        this.on('pointerupoutside', this.onPointerUp);
    }

    setActive() {
        this.active.show();
        this.hover.hide();
        this.press.hide();
    }

    onPointerOut() {
        if (this.clicked)
        return;
    this.setActive();
    }

    setHover() {
        this.active.hide();
        this.hover.show();
        this.press.hide();
    }
    
    setPress() {
        this.active.hide();
        this.hover.hide();
        this.press.show();
    }

    onHover() {
        if (this.clicked)
        return;
        this.setHover()
    }

    onPointerDown() {
        this.clicked = true;
        this.setPress()
    }

    onPointerUp() {
        this.clicked = false;
        this.setActive()
    }

    onClick(event) {
        event.stopPropagation();
        if (this.config && typeof this.config.onClickFunc === 'function')
            this.config.onClickFunc();
        this.onPointerUp();
    }

    getDefaultConfig(config) {
        return Object.assign(super.getDefaultConfig(config), {
            sprites: [
                {
                    name: 'active',
                    image: `./src/assets/UI/btn_${config.btnName}_active.png`
                },
                {
                    name: 'hover',
                    image: `./src/assets/UI/btn_${config.btnName}_hover.png`,
                    visible: false
                },
                {
                    name: 'press',
                    image: `./src/assets/UI/btn_${config.btnName}_press.png`,
                    visible: false
                }
            ]
        })
        }
}