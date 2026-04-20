import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Habit = sequelize.define("habits", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  plan_detail_id: { type: DataTypes.INTEGER, allowNull: true },
  activity_name: DataTypes.STRING,
  target: DataTypes.STRING,
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false
});

export default Habit;