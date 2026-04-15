import { instance } from "../index";
import type { UserRole } from "../../types";

interface RolesListResponse {
  status: boolean;
  data: UserRole[];
  message: string;
}

export const getRoles = () => {
  return instance.get<RolesListResponse>("/roles");
};
