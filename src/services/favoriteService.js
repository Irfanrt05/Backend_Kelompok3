import api from "./api";

export const addFavoriteRecipe = (recipeId) => api.post("/user/favorites", { recipe_id: recipeId });
export const getFavoriteRecipes = () => api.get("/user/favorites");
export const deleteFavoriteRecipe = (favoriteId) => api.delete(`/user/favorites/${favoriteId}`);
