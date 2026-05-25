import { Recipe, User } from "../models/index.js";
import { logActivity } from "../utils/activityLog.js";

export const createRecipe = async (req, res) => {
  try {
    const { title, category, calories, details, image_url } = req.body;

    if (!title) return res.status(400).json({ message: "title is required" });

    const recipe = await Recipe.create({
      admin_id: req.user.id,
      title,
      category,
      calories,
      details,
      image_url
    });

    await logActivity(req.user.id, "ADMIN_CREATE_RECIPE");
    return res.status(201).json({ status: "success", data: recipe });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      include: [{ model: User, attributes: ["id", "username", "email", "role"] }],
      order: [["id", "DESC"]]
    });

    return res.json({ status: "success", data: recipes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["id", "username", "email", "role"] }]
    });

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    return res.json({ status: "success", data: recipe });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    await recipe.update(req.body);
    await logActivity(req.user.id, "ADMIN_UPDATE_RECIPE");

    return res.json({ status: "success", message: "Recipe updated", data: recipe });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    await recipe.destroy();
    await logActivity(req.user.id, "ADMIN_DELETE_RECIPE");

    return res.json({ status: "success", message: "Recipe deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
