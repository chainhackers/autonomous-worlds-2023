import {Has, defineEnterSystem, defineExitSystem, defineSystem, getComponentValueStrict} from "@latticexyz/recs"
import {pixelCoordToTileCoord, tileCoordToPixelCoord} from "@latticexyz/phaserx"
import {PhaserLayer} from "../createPhaserLayer";
import {TILE_HEIGHT, TILE_WIDTH} from "../constants";

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
        const playerObj = objectPool.get(entity, "Rectangle");

        playerObj.setComponent({
            id: "animation",
            once: (rect) => {
                rect.setSize(TILE_WIDTH, TILE_HEIGHT);
                rect.setFillStyle(0xE34234);
            }
        })
    })

    defineExitSystem(world, [Has(Position)], ({entity}) => {
        const playerObj = objectPool.get(entity, "Rectangle");

        playerObj.setComponent({
            id: "animation",
            once: (rect) => {
                rect.setSize(TILE_WIDTH, TILE_HEIGHT);
                rect.setFillStyle(0x000000);
            }
        })
    })

    defineSystem(world, [Has(Position)], ({entity}) => {
        const position = getComponentValueStrict(Position, entity);
        const pixelPosition = tileCoordToPixelCoord(position, TILE_HEIGHT, TILE_WIDTH);

        const playerObj = objectPool.get(entity, "Rectangle");
        playerObj.setComponent({
            id: "position",
            once: (rect) => {
                rect.setPosition(pixelPosition.x, pixelPosition.y);
            }
        })
    })
}