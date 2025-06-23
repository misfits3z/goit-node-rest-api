import { DataTypes } from "sequelize";

import sequelize from "./sequelize.js";

const Type = sequelize.define("type", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Type.sync();

export default Type;
