import axiosInstance from "./axiosInstance.jsx";

export const createTask = async (data) => {
  const response = await axiosInstance.post("/create-task", data);

  return response.data;
};

export const getAllTasks = async () => {
  const response = await axiosInstance.get("/get-all-tasks");

  return response.data;
};

export const getTaskById = async (taskId) => {
  const response = await axiosInstance.get(`/get-task-by-id/${taskId}`);

  return response.data;
};

export const getMyTasks = async () => {
  const response = await axiosInstance.get("/get-my-task");

  return response.data;
};

export const updateTaskById = async (taskId, data) => {
  const response = await axiosInstance.put(`/update-task-by-id/${taskId}`, data);

  return response.data;
};

export const updateMyTaskStatus = async (taskId, data) => {
  const response = await axiosInstance.put(
    `/update-my-task-status/${taskId}`,
    data,
  );

  return response.data;
};

export const deleteTaskById = async (taskId) => {
  const response = await axiosInstance.delete(`/delete-task-by-id/${taskId}`);

  return response.data;
};
