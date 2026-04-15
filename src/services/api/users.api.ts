import { instance } from "../index";

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  admins: number;
}

interface UserStatsResponse {
  status: boolean;
  data: UserStats;
  message: string;
}

export const getUserStats = () => {
  return instance.get<UserStatsResponse>("/users/stats");
};

export interface UsersListResponse {
  status: boolean;
  data: {
    list: import("../../types").User[];
    page: number;
    size: number;
    total: number;
  };
  message: string;
}

export const getUsers = (params: {
  page: number;
  size: number;
  search?: string;
  role_id?: string;
}) => {
  return instance.get<UsersListResponse>("/users", { params });
};

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role_id: string;
  status: "active" | "inactive";
}

export const createUser = (payload: CreateUserPayload) => {
  return instance.post("/users", payload);
};

export interface UpdateUserPayload {
  name: string;
  role_id: string;
  status: "active" | "inactive";
}

export const updateUser = (id: string, payload: UpdateUserPayload) => {
  return instance.put(`/users/${id}`, payload);
};

export const deleteUser = (id: string) => {
  return instance.delete(`/users/${id}`);
};
