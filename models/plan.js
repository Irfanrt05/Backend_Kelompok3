import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Plan = sequelize.define("generated_plans", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  profile_id: { type: DataTypes.INTEGER, allowNull: false },
  plan_period: DataTypes.STRING,
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false
});

export default Plan;