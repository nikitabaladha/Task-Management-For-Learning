import type { UserResponse } from '../../users/interfaces/user.interface.js';

export interface ProjectResponse {
  _id: string;
  name: string;
  description?: string;
  createdById: string;
  createdBy?: UserResponse;
  createdAt: Date;
  updatedAt: Date;
}
