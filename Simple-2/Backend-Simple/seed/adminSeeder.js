import bcrypt from "bcryptjs";

import User from "../models/User.js";

const createAdminIfnOtExists = async () => {
  try {
    const existAdmin = await User.findOne({
      role: "Admin",
    });

    if (existAdmin) {
      console.log("Admin alredy exists");

      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "Admin",
    });

    console.log("Admin Created Successfully");
  } catch (error) {
    console.error("Admin creation failed", error.message);

    throw error;
  }
};
export default createAdminIfnOtExists;
