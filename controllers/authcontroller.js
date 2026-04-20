import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    ...req.body,
    password: hash
  });

  res.json({ status: "success", data: user });
};

export const login = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET
  );

  res.json({ token });
};