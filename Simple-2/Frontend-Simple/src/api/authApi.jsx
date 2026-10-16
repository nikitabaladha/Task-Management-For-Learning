import axiosInstance from "./axiosInstance.jsx";

export const loginUser = async (data) => {
  const response = await axiosInstance.post("/login", data);

  return response.data;
};

export const signupUser = async (data) => {
  const response = await axiosInstance.post("/signup", data);

  return response.data;
};

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/get-all-users");

  return response.data;
};
