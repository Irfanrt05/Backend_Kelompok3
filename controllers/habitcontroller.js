import { Habit, HabitTask } from "../models/index.js";

export const createHabit = async (req, res) => {
  const habit = await Habit.create({
    user_id: req.user.id,
    ...req.body
  });
  res.json(habit);
};

export const checkHabit = async (req, res) => {
  const task = await HabitTask.create({
    habit_id: req.params.id,
    ...req.body
  });
  res.json(task);
};