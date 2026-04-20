import { Profile, Plan, PlanDetail } from "../models/index.js";

export const generatePlan = async (req, res) => {
  try {
    const profile = await Profile.create({
      user_id: req.user.id,
      ...req.body
    });

    const plan = await Plan.create({
      profile_id: profile.id,
      plan_period: req.body.plan_period
    });

    // dummy generate detail
    await PlanDetail.bulkCreate([
      { plan_id: plan.id, day: "Day 1", title: "Workout" },
      { plan_id: plan.id, day: "Day 2", title: "Meal Plan" }
    ]);

    res.json({ status: "success", data: plan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};