import { instance } from "../index";
import type { UserRole } from "../../types";

interface RolesListResponse {
  status: boolean;
  data: UserRole[];
  message: string;
}

interface RoleResponse {
  status: boolean;
  data: UserRole;
  message: string;
}

export const getRoles = () => {
  return instance.get<RolesListResponse>("/roles");
};

export const createRole = (payload: {
  name: string;
  permissions: Record<string, string[]>;
}) => {
  return instance.post<RoleResponse>("/roles", payload);
};

export const updateRole = (
  id: string,
  payload: { name: string; permissions: Record<string, string[]> },
) => {
  return instance.put<RoleResponse>(`/roles/${id}`, payload);
};

export const deleteRole = (id: string) => {
  return instance.delete(`/roles/${id}`);
};
