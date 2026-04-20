import { Favorite } from "../models/index.js";

export const addFavorite = async (req, res) => {
  const fav = await Favorite.create({
    user_id: req.user.id,
    recipe_id: req.body.recipe_id
  });
  res.json(fav);
};