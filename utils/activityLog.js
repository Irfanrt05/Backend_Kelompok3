import { ActivityLog } from "../models/index.js";

export const logActivity = async (userId, activityText) => {
  if (!userId || !activityText) return;

  try {
    // Kita coba simpan ke KEDUA nama kolom yang mungkin ada
    // agar dashboard Anda PASTI dapat data
    await ActivityLog.create({
      user_id: userId,
      activity: activityText, // Coba simpan ke kolom 'activity'
      action_description: activityText, // Coba simpan ke kolom 'action_description'
    });
  } catch (error) {
    console.error("Gagal simpan log (cek kolom DB Anda):", error);
  }
};
