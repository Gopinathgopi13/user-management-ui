import type { RoleResponse, RolesListResponse } from "../../types";
import { instance } from "../index";

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
