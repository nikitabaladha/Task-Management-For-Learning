import axiosInstance from "./axiosInstance";
import type { ProjectFormData, ApiResponse, Project } from "../types";

export const createProject = async (data: ProjectFormData): Promise<ApiResponse<Project>> => {
  const response = await axiosInstance.post<ApiResponse<Project>>("/create-project", data);
  return response.data;
};

export const getAllProjects = async (): Promise<ApiResponse<Project[]>> => {
  const response = await axiosInstance.get<ApiResponse<Project[]>>("/get-all-projects");
  return response.data;
};

export const getProjectById = async (projectId: string): Promise<ApiResponse<Project>> => {
  const response = await axiosInstance.get<ApiResponse<Project>>(`/get-project-by-id/${projectId}`);
  return response.data;
};

export const updateProjectById = async (projectId: string, data: Partial<ProjectFormData>): Promise<ApiResponse<Project>> => {
  const response = await axiosInstance.put<ApiResponse<Project>>(`/update-project-by-id/${projectId}`, data);
  return response.data;
};

export const deleteProjectById = async (projectId: string): Promise<ApiResponse<Project>> => {
  const response = await axiosInstance.delete<ApiResponse<Project>>(`/delete-project-by-id/${projectId}`);
  return response.data;
};