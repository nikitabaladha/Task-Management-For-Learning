import axiosInstance from "./axiosInstance";
import type { LoginData, SignupData, AuthResponse, ApiResponse, User } from "../types";

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/login", data);
  return response.data;
};

export const signupUser = async (data: SignupData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/signup", data);
  return response.data;
};

export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  const response = await axiosInstance.get<ApiResponse<User[]>>("/get-all-users");
  return response.data;
};