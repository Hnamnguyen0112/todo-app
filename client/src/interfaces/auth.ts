import { User } from "./user";

export interface LoginResponse {
  refresh: string;
  access: string;
  refreshExp: number;
  accessExp: number;
  user: User;
}
