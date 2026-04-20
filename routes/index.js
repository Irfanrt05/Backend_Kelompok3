import express from "express";
import { register, login } from "../controllers/authController.js";
import { generatePlan } from "../controllers/planController.js";
import { createHabit, checkHabit } from "../controllers/habitController.js";
import { createRecipe } from "../controllers/recipeController.js";
import { addFavorite } from "../controllers/favoriteController.js";
import { createReminder } from "../controllers/reminderController.js";

import { verifyToken } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";

const router = express.Router();

// AUTH
router.post("/auth/register", register);
router.post("/auth/login", login);

// PLAN
router.post("/plans", verifyToken, generatePlan);

// HABIT
router.post("/habits", verifyToken, createHabit);
router.post("/habits/:id/check", verifyToken, checkHabit);

// FAVORITE
router.post("/favorites", verifyToken, addFavorite);

// REMINDER
router.post("/reminders", verifyToken, createReminder);

// ADMIN
router.post("/admin/recipes", verifyToken, authorize("admin"), createRecipe);

export default router;