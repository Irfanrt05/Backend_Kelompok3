import { Recipe } from "../models/index.js";

export const createRecipe = async (req, res) => {
  const recipe = await Recipe.create({
    admin_id: req.user.id,
    ...req.body
  });
  res.json(recipe);
};