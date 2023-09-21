import Hero from "./Sprites/Hero";
import Location from "./Sprites/Location";
import Track from "./Sprites/Track";
import UI from "./Sprites/UI";
import Intro from "./Sprites/UI/Intro";
import { OBJECTS } from "./const";

export default {
    sprites: [
        {
            class: Location
        },
        {
            class: Hero,
            linkID: OBJECTS.hero
        },
        {
            class: Track
        },
        {
            class: UI
        },
        {
            class: Intro,
            linkID: OBJECTS.intro,
            visible: false
        }
]
}