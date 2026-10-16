import mongoose, { Document, Model } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  projectId: mongoose.Types.ObjectId;
  assignedToId: mongoose.Types.ObjectId;
  assignedById: mongoose.Types.ObjectId;
  status: "Pending" | "In Progress" | "Completed";
  priority: "High" | "Medium" | "Low";
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema = new mongoose.Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedToId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
  },
  { timestamps: true },
);

const Task: Model<ITask> = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
