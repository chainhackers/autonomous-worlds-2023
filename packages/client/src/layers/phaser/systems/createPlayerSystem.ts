import {Has, defineEnterSystem, defineSystem, getComponentValueStrict} from "@latticexyz/recs"
import {pixelCoordToTileCoord, tileCoordToPixelCoord} from "@latticexyz/phaserx"
import {PhaserLayer} from "../createPhaserLayer";
import {TILE_HEIGHT, TILE_WIDTH} from "../constants";
import { Assets, Animations } from "../constants";

export function createPlayerSystem(layer: PhaserLayer) {
    const {
        world,
        networkLayer: {
            components: {
                Position,
            },
            systemCalls: {
                spawn,
            }
        },
        scenes: {
            Main: {
                objectPool,
                input,
            }
        }
    } = layer;

    input.pointerdown$.subscribe(({pointer, event}) => {
        if (!pointer) {
            return;
        }
        const x = pointer.worldX;
        const y = pointer.worldY;

        const position = pixelCoordToTileCoord({x, y}, TILE_WIDTH, TILE_HEIGHT);
        if (position.x === 0 && position.y === 0) return;

        spawn(position.x, position.y);
    })

    defineEnterSystem(world, [Has(Position)], ({entity}) => {
        const playerObj = objectPool.get(entity, "Sprite");
        
        // view player sprite (not animated)
        playerObj.setComponent({
            id: "sprite",
            once: (sprite) => {
                sprite.setTexture(Assets.Player);
                //sprite.setDisplaySize(TILE_WIDTH, TILE_HEIGHT);
                //sprite.setScale(1);
            }
        })
    })

    defineSystem(world, [Has(Position)], ({entity}) => {
        const position = getComponentValueStrict(Position, entity);
        const pixelPosition = tileCoordToPixelCoord(position, TILE_HEIGHT, TILE_WIDTH);

        const playerObj = objectPool.get(entity, "Sprite");
        playerObj.setComponent({
            id: "position",
            once: (sprite) => {
                sprite.setPosition(pixelPosition.x, pixelPosition.y);
            }
        })
    })
}
