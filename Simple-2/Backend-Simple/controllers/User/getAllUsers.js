import User from "../../models/User.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "User" }).sort({ createdAt: -1 });

    const formattedUsers = users.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: formattedUsers,
    });
  } catch (error) {
    console.error("Error fetching all users", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getAllUsers;
