// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {System} from "@latticexyz/world/src/System.sol";
import {getKeysWithValue} from "@latticexyz/world/src/modules/keyswithvalue/getKeysWithValue.sol";
import {Position, PositionTableId} from "../codegen/Tables.sol";

contract MapSystem is System {

    function cellInhabitant(int32 x, int32 y) public view returns (bytes32 result){
//        bytes32[] memory inhabitants = getKeysWithValue(
//            PositionTableId,
//            Position.encode(x, y)
//        );
        result = bytes32(uint256(1));
//        if (inhabitants.length > 0) {
//            result = inhabitants[0];
//        }
    }
}
