import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const HabitTask = sequelize.define("habit_tasks", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  habit_id: { type: DataTypes.INTEGER, allowNull: false },
  date: DataTypes.DATEONLY,
  is_completed: DataTypes.BOOLEAN,
  created_at: DataTypes.DATE
}, {
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ["habit_id", "date"]
    }
  ]
});

export default HabitTask;