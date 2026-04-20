import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ActivityLog = sequelize.define("activity_logs", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  action_description: DataTypes.TEXT,
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false
});

export default ActivityLog;