import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Profile = sequelize.define("user_health_profiles", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  weight: DataTypes.FLOAT,
  height: DataTypes.FLOAT,
  activity_level: DataTypes.STRING,
  goal_type: DataTypes.STRING,
  budget_limit: DataTypes.FLOAT,
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false
});

export default Profile;