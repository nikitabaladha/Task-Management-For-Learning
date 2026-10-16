import axiosInstance from "./axiosInstance";
import type { TaskFormData, ApiResponse, Task } from "../types";

export const createTask = async (data: TaskFormData): Promise<ApiResponse<Task>> => {
  const response = await axiosInstance.post<ApiResponse<Task>>("/create-task", data);
  return response.data;
};

export const getAllTasks = async (): Promise<ApiResponse<Task[]>> => {
  const response = await axiosInstance.get<ApiResponse<Task[]>>("/get-all-tasks");
  return response.data;
};

export const getTaskById = async (taskId: string): Promise<ApiResponse<Task>> => {
  const response = await axiosInstance.get<ApiResponse<Task>>(`/get-task-by-id/${taskId}`);
  return response.data;
};

export const getMyTasks = async (): Promise<ApiResponse<Task[]>> => {
  const response = await axiosInstance.get<ApiResponse<Task[]>>("/get-my-task");
  return response.data;
};

export const updateTaskById = async (taskId: string, data: Partial<TaskFormData>): Promise<ApiResponse<Task>> => {
  const response = await axiosInstance.put<ApiResponse<Task>>(`/update-task-by-id/${taskId}`, data);
  return response.data;
};

export const updateMyTaskStatus = async (taskId: string, data: { status: string }): Promise<ApiResponse<Task>> => {
  const response = await axiosInstance.put<ApiResponse<Task>>(`/update-my-task-status/${taskId}`, data);
  return response.data;
};

export const deleteTaskById = async (taskId: string): Promise<ApiResponse<Task>> => {
  const response = await axiosInstance.delete<ApiResponse<Task>>(`/delete-task-by-id/${taskId}`);
  return response.data;
};