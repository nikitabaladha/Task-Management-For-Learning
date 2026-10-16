import { Request,Response } from "express";
import bcrypt from "bcryptjs";

import User from "../../models/User.js";
import { signupValidator } from "../../validators/userValidator.js";

const signup = async (req:Request, res:Response) : Promise<Response>=> {
  try {
    const { error, value } = signupValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
       return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const { name, email, password } = value;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      }); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "User",
    });

   return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup Error", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default signup;
