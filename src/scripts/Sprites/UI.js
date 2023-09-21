import Sprite from "../Core/Sprite";
import { OBJECTS } from "../const";
import ButtonsPanel from "./UI/ButtonsPanel";
import CoinsPanel from "./UI/CoinsPanel";
import Fade from "./UI/Fade";
import LeaderBoard from "./UI/Leaderboard";
import ScorePanel from "./UI/ScorePanel";
import StartPanel from "./UI/startPanel";

export default class UI extends Sprite {
    getDefaultConfig(config) {
        return Object.assign(super.getDefaultConfig(config), {
            sprites: [
                {
                    class: CoinsPanel,
                    position: {x: 18, y: 24}
                },
                {
                    class: ScorePanel,
                    linkID: OBJECTS.scorePanel,
                    visible: false
                },
                {
                    class: StartPanel,
                    linkID: OBJECTS.startPanel
                },
                {
                    class: LeaderBoard,
                    linkID: OBJECTS.leadBoard,
                    visible: false
                },
                {
                    class: Fade,
                    linkID: OBJECTS.fade
                },
                {
                    class: ButtonsPanel,
                    position: {y: 12}
                }
            ]
        })
        }
}