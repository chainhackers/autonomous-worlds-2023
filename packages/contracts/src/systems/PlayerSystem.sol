pragma solidity >= 0.8.0;

import {System} from "@latticexyz/world/src/System.sol";

import {addressToEntity} from "@latticexyz/solecs/src/utils.sol";
import {getKeysWithValue} from "@latticexyz/world/src/modules/keyswithvalue/getKeysWithValue.sol";

import {
Position
} from "../codegen/Tables.sol";

contract PlayerSystem is System {
    function spawn(int32 x, int32 y) public {
        bytes32 player = bytes32(addressToEntity(_msgSender()));

        Position.set(player, x, y);
    }
}
