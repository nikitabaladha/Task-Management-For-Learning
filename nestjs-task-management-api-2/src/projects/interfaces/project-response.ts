export interface ProjectResponse {
  _id: string;
  name: string;
  description?: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}
