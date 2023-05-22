pragma solidity >= 0.8.0;

import {System} from "@latticexyz/world/src/System.sol";

import {addressToEntity} from "@latticexyz/solecs/src/utils.sol";
import {getKeysWithValue} from "@latticexyz/world/src/modules/keyswithvalue/getKeysWithValue.sol";

import {IWorld} from "../codegen/world/IWorld.sol";
import {Position} from "../codegen/Tables.sol";


import {Direction} from "../codegen/Types.sol";

contract PlayerSystem is System {

    function spawn(int32 x, int32 y) public {
        bytes32 player = bytes32(addressToEntity(_msgSender()));

        Position.set(player, x, y);
    }

    function die() public {
        bytes32 player = bytes32(addressToEntity(_msgSender()));
        Position.deleteRecord(player);
    }

    function move(Direction direction) public {
        bytes32 player = bytes32(addressToEntity(_msgSender()));

        int32 nextX = Position.getX(player);
        int32 nextY = Position.getY(player);
        if (direction == Direction.Up) {
            nextY--;
        } else if (direction == Direction.Down) {
            nextY++;
        } else if (direction == Direction.Left) {
            nextX--;
        } else if (direction == Direction.Right) {
            nextX++;
        }

        if (IWorld(_world()).cellInhabitant(nextX, nextY) > 0) {
            die();
        } else {
            Position.set(player, nextX, nextY);
        }
    }
}
