// src/types/index.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "Admin" | "User";
}

export interface AuthResponse {
  success: boolean;
  token: string;
  data: User;
  message?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  createdBy: string;
  createdByName?: string;
  createdByEmail?: string;
  createdByRole?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  project: string;
  projectName?: string;
  projectId?: string;
  assignedTo: string;
  assignedToName?: string;
  assignedToEmail?: string;
  assignedByName?: string;
  assignedByEmail?: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Completed";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  project: string;
  projectId?: string;
  assignedTo: string;
  assignedToId?: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Completed";
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}