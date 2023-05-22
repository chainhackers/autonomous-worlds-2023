import { mudConfig } from "@latticexyz/world/register";

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
