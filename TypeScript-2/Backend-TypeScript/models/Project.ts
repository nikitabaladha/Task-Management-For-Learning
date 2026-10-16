import mongoose, { Document, Model } from "mongoose";

interface IProject extends Document{
  name:string;
  description?:string;
  createdBy:mongoose.Types.ObjectId;
  createdAt?:Date;
  updatedAt?:Date;
}

const ProjectSchema = new mongoose.Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Project:Model<IProject> = mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
