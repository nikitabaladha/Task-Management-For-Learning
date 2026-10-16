import bcrypt from "bcryptjs";

import User from "../models/User.js";

const createAdminIfNoExists = async (): Promise<void> => {
  try {
    const existAdmin = await User.findOne({
      role: "Admin",
    });

    if (existAdmin) {
      console.log("Admin already exists");
      return;
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminPassword || !adminName || !adminEmail) {
      throw new Error(
        "Missing required environment variables for admin creation",
      );
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "Admin",
    });

    console.log("Admin created Successfully");
  } catch (error) {
    console.error("Admin creation failed", (error as Error).message);

    throw error;
  }
};
export default createAdminIfNoExists;
