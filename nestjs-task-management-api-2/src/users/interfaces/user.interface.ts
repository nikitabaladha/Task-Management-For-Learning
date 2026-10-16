export type UserRole = 'Admin' | 'User';

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}
