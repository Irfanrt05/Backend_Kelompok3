import { Recipe, User } from "../models/index.js";
import { logActivity } from "../utils/activityLog.js";
import fs from "fs";
import path from "path";

const deleteFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export const createRecipe = async (req, res) => {
  try {
    const { title, category, calories, details } = req.body;

    // 1. Ambil path dari req.file (ini ditambahkan oleh middleware multer)
    // Jika req.file ada, ambil path-nya. Jika tidak ada, simpan null/string kosong
    const image_url = req.file ? req.file.path : null;

    if (!title) return res.status(400).json({ message: "title is required" });

    const recipe = await Recipe.create({
      admin_id: req.user.id,
      title,
      category,
      calories,
      details,
      image_url, // 2. Simpan path yang sudah didapat
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
      include: [
        { model: User, attributes: ["id", "username", "email", "role"] },
      ],
      order: [["id", "DESC"]],
    });

    return res.json({ status: "success", data: recipes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "username", "email", "role"] },
      ],
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

    // Jika ada file baru yang di-upload
    if (req.file) {
      // 1. Hapus gambar lama dari server
      const oldPath = recipe.image_url;
      deleteFile(oldPath);

      // 2. Update image_url dengan path file baru
      req.body.image_url = req.file.path;
    }

    await recipe.update(req.body);
    await logActivity(req.user.id, "ADMIN_UPDATE_RECIPE");

    return res.json({
      status: "success",
      message: "Recipe updated",
      data: recipe,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Hapus gambar fisik sebelum menghapus data dari DB
    if (recipe.image_url) {
      deleteFile(recipe.image_url);
    }

    await recipe.destroy();
    await logActivity(req.user.id, "ADMIN_DELETE_RECIPE");

    return res.json({ status: "success", message: "Recipe deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
