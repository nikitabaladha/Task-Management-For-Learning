import mongoose, { Document, Model } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string,
  role: "Admin" | "User"
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
  },
  {
    timestamps: true,
  },
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
