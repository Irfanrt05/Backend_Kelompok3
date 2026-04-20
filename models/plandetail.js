import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PlanDetail = sequelize.define("plan_details", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  plan_id: { type: DataTypes.INTEGER, allowNull: false },
  day: DataTypes.STRING,
  activity_type: DataTypes.STRING,
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  estimated_cost: DataTypes.FLOAT
}, {
  timestamps: false
});

export default PlanDetail;