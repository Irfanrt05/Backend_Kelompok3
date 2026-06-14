import { Blog, User } from "../models/index.js";
import { logActivity } from "../utils/activityLog.js";
import fs from "fs";
import path from "path";

export const createBlog = async (req, res) => {
  try {
    const { title, category, content, published_at } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "title and content are required" });
    }

    // FIX: Mengambil path dari file yang diupload multer
    const imagePath = req.file ? req.file.path : null;

    const blog = await Blog.create({
      admin_id: req.user.id,
      title,
      category,
      content,
      image_url: imagePath, // FIX: Menggunakan variabel yang benar
      published_at: published_at || new Date(),
    });

    await logActivity(req.user.id, "ADMIN_CREATE_BLOG");
    return res.status(201).json({ status: "success", data: blog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        { model: User, attributes: ["id", "username", "email", "role"] },
      ],
      order: [["id", "DESC"]],
    });

    return res.json({ status: "success", data: blogs });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "username", "email", "role"] },
      ],
    });

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    return res.json({ status: "success", data: blog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const updateData = { ...req.body };

    // Jika user mengupload gambar baru, hapus gambar lama agar tidak menumpuk
    if (req.file) {
      if (blog.image_url) {
        const oldImagePath = path.resolve(blog.image_url);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.image_url = req.file.path;
    }

    await blog.update(updateData);
    await logActivity(req.user.id, "ADMIN_UPDATE_BLOG");

    return res.json({ status: "success", message: "Blog updated", data: blog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Di dalam fungsi deleteBlog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const title = blog.title; // Simpan judul untuk log

    // Hapus file
    if (blog.image_url) {
      const filePath = path.resolve(blog.image_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await blog.destroy();

    // Log yang informatif
    await logActivity(req.user.id, `Admin menghapus blog: ${title}`);

    return res.json({ status: "success", message: "Blog berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
