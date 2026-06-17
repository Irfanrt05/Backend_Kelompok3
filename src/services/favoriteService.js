import api from "./api";

export const addFavoriteRecipe = (recipeId) =>
  api.post("/user/favorites", { recipe_id: recipeId });

export const addFavoriteBlog = (blogId) =>
  api.post("/user/favorites/blogs", { blog_id: blogId });

export const getFavorites = () =>
  api.get("/user/favorites");

export const deleteFavorite = (id) =>
  api.delete(`/user/favorites/${id}`);

export const deleteFavoriteBlog = (id) =>
  api.delete(`/user/favorites/blogs/${id}`);
