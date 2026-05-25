import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Favorite = sequelize.define("favorites", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  recipe_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  underscored: true,
  timestamps: true,
  indexes: [{ unique: true, fields: ["user_id", "recipe_id"] }]
});

export default Favorite;
