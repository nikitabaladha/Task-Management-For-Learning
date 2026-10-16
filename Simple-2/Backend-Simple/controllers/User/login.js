import bcrypt from "bcryptjs";

import User from "../../models/User.js";
import { loginValidator } from "../../validators/userValidator.js";
import generateToken from "../../utils/generateToken.js";

const login = async (req, res) => {
  try {
    const { error, value } = loginValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const { email, password } = value;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = generateToken(user._id.toString(), user.role);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default login;
