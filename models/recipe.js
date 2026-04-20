import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Recipe = sequelize.define("recipes", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  admin_id: { type: DataTypes.INTEGER, allowNull: false },
  title: DataTypes.STRING,
  category: DataTypes.STRING,
  calories: DataTypes.INTEGER,
  details: DataTypes.TEXT,
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false
});

export default Recipe;