import axiosInstance from "./axiosInstance.jsx";

export const createProject = async (data) => {
  const response = await axiosInstance.post("/create-project", data);

  return response.data;
};

export const getAllProjects = async () => {
  const response = await axiosInstance.get("/get-all-projects");

  return response.data;
};

export const getProjectById = async (projectId) => {
  const response = await axiosInstance.get(`/get-project-by-id/${projectId}`);

  return response.data;
};

export const updateProjectById = async (projectId, data) => {
  const response = await axiosInstance.put(
    `/update-project-by-id/${projectId}`,
    data,
  );

  return response.data;
};

export const deleteProjectById = async (projectId) => {
  const response = await axiosInstance.delete(
    `/delete-project-by-id/${projectId}`,
  );

  return response.data;
};
