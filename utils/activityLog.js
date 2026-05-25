import { ActivityLog } from "../models/index.js";

export const logActivity = async (userId, actionDescription) => {
  if (!userId || !actionDescription) return;
  await ActivityLog.create({ user_id: userId, action_description: actionDescription });
};
