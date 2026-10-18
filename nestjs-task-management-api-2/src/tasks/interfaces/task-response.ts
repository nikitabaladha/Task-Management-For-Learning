import { TaskPriority, TaskStatus } from '../schemas/task.schema.js';
import type { ProjectResponse } from '../../projects/interfaces/project-response.js';
import type { UserResponse } from '../../users/interfaces/user.interface.js';

export interface TaskResponse {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  project?: ProjectResponse;
  createdById: string;
  createdBy?: UserResponse;
  assignedToId: string | null;
  assignedTo?: UserResponse;
  createdAt: Date;
  updatedAt: Date;
}
