import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./config/db.js";
import createAdminIfNoExists from "./seed/adminSeeder.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    //1. Connect MongoDB
    await connectDB();

    //2. Create Admin only if no Admin exists
    await createAdminIfNoExists();

    //3. Start express server
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed", error.message);

    process.exit(1);
  }
};

startServer();
