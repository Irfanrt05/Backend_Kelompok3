import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Blog = sequelize.define("blogs", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  admin_id: { type: DataTypes.INTEGER, allowNull: false },
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  published_at: DataTypes.DATE
}, {
  timestamps: false
});

export default Blog;