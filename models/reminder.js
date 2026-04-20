import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Reminder = sequelize.define("reminders", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  habit_id: { type: DataTypes.INTEGER, allowNull: true },
  message: DataTypes.TEXT,
  schedule_time: DataTypes.DATE,
  frequency: DataTypes.STRING
}, {
  timestamps: false
});

export default Reminder;