import { Reminder } from "../models/index.js";

export const createReminder = async (req, res) => {
  const reminder = await Reminder.create({
    user_id: req.user.id,
    ...req.body
  });
  res.json(reminder);
};