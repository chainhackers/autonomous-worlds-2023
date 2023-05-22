import { mudConfig, resolveTableId } from "@latticexyz/world/register";

export default mudConfig({
  enums: {
    Direction: [
      "Unknown",
      "Up",
      "Down",
      "Left",
      "Right",
    ]
  },
  modules: [
    {
      name: "KeysWithValueModule",
      root: true,
      args: [resolveTableId("Position")],
    },
  ],
  tables: {
    Position: {
      schema: {
        x: "int32",
        y: "int32",
      }
    },
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
  },
});
