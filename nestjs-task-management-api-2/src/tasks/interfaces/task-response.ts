import { TaskPriority, TaskStatus } from '../schemas/task.schema.js';

export interface TaskResponse {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}
