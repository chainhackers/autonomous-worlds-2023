import {Direction} from "../constants";
import {PhaserLayer} from "../createPhaserLayer";

export function createControlsSystem(layer: PhaserLayer) {
    const {
        scenes: {
            Main: {
                input,
            },
        },
        networkLayer: {
            systemCalls: {
                move,
                die
            },
        },
    } = layer;

    input.onKeyPress(
        keys => keys.has("W"),
        () => {
            move(Direction.Up);
        });

    input.onKeyPress(
        keys => keys.has("A"),
        () => {
            move(Direction.Left);
        }
    );

    input.onKeyPress(
        keys => keys.has("S"),
        () => {
            move(Direction.Down);
        }
    );

    input.onKeyPress(
        keys => keys.has("D"),
        () => {
            move(Direction.Right);
        }
    );

    input.onKeyPress(
        keys => keys.has("Q"),
        () => {
            die();
        }
    );
}
