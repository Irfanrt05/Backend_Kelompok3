import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserHealthProfile = sequelize.define("user_health_profiles", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: true },
  gender: { type: DataTypes.STRING, allowNull: true },
  weight: { type: DataTypes.FLOAT, allowNull: false },
  height: { type: DataTypes.FLOAT, allowNull: false },
  activity_level: { type: DataTypes.STRING, allowNull: false, defaultValue: "medium" },
  goal_type: { type: DataTypes.STRING, allowNull: false, defaultValue: "maintain" },
  budget_limit: { type: DataTypes.FLOAT, allowNull: true }
}, {
  underscored: true,
  timestamps: true
});

export default UserHealthProfile;
