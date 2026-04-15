import type {
  CreateUserPayload,
  UpdateUserPayload,
  UsersListResponse,
  UserStatsResponse,
} from "../../types";
import { instance } from "../index";

export const getUserStats = () => {
  return instance.get<UserStatsResponse>("/users/stats");
};

export const getUsers = (params: {
  page: number;
  size: number;
  search?: string;
  role_id?: string;
}) => {
  return instance.get<UsersListResponse>("/users", { params });
};

export const createUser = (payload: CreateUserPayload) => {
  return instance.post("/users", payload);
};

export const updateUser = (id: string, payload: UpdateUserPayload) => {
  return instance.put(`/users/${id}`, payload);
};

export const deleteUser = (id: string) => {
  return instance.delete(`/users/${id}`);
};
