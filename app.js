import express from "express";
import cors from "cors";
import path from "path"; // 1. Tambahkan ini
import { fileURLToPath } from "url"; // 2. Tambahkan ini
import routes from "./routes/index.js";

const app = express();

// Konfigurasi __dirname untuk ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. TAMBAHKAN INI: Memberikan akses publik ke folder uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.json({ message: "PROBIT Backend API is running" });
});

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
