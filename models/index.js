import sequelize from "../config/database.js";

import User from "./user.js";
import Profile from "./profile.js";
import Plan from "./plan.js";
import PlanDetail from "./planDetail.js";
import Habit from "./habit.js";
import HabitTask from "./habitTask.js";
import Recipe from "./recipe.js";
import Blog from "./blog.js";
import Favorite from "./favorite.js";
import Reminder from "./reminder.js";
import ActivityLog from "./activityLog.js";

// RELATIONS
User.hasMany(Profile, { foreignKey: "user_id" });
Profile.belongsTo(User);

Profile.hasMany(Plan, { foreignKey: "profile_id" });
Plan.belongsTo(Profile, { foreignKey: "profile_id" });

Plan.hasMany(PlanDetail, { foreignKey: "plan_id" });
PlanDetail.belongsTo(Plan, { foreignKey: "plan_id" });

User.hasMany(Habit, { foreignKey: "user_id" });
Habit.belongsTo(User, { foreignKey: "user_id" });

PlanDetail.hasMany(Habit, { foreignKey: "plan_detail_id" });
Habit.belongsTo(PlanDetail, { foreignKey: "plan_detail_id" });

Habit.hasMany(HabitTask, { foreignKey: "habit_id" });
HabitTask.belongsTo(Habit, { foreignKey: "habit_id" });

User.hasMany(Recipe, { foreignKey: "admin_id" });
Recipe.belongsTo(User, { foreignKey: "admin_id" });

User.hasMany(Blog, { foreignKey: "admin_id" });
Blog.belongsTo(User, { foreignKey: "admin_id" });

User.belongsToMany(Recipe, { through: Favorite, foreignKey: "user_id" });
Recipe.belongsToMany(User, { through: Favorite, foreignKey: "recipe_id" });

User.hasMany(Reminder, { foreignKey: "user_id" });
Reminder.belongsTo(User, { foreignKey: "user_id" });

Habit.hasMany(Reminder, { foreignKey: "habit_id" });
Reminder.belongsTo(Habit, { foreignKey: "habit_id" });

User.hasMany(ActivityLog, { foreignKey: "user_id" });

export {
  sequelize,
  User,
  Profile,
  Plan,
  PlanDetail,
  Habit,
  HabitTask,
  Recipe,
  Blog,
  Favorite,
  Reminder,
  ActivityLog
};
