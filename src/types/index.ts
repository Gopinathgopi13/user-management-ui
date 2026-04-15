import type { ReactNode } from "react";
import { type InputProps, type TableProps } from "antd";
import type { Socket } from "socket.io-client";
export interface AuthSessionData {
  access_token: string;
  refresh_token: string;
  user: any;
}

export interface UserRole {
  id: string;
  name: string;
  permissions: Record<string, string[]>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  role_id: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UserFormProps {
  roles: UserRole[];
  user?: User | null;
  onSuccess: () => void;
  onClose: () => void;
}

export interface RoleFormProps {
  role?: UserRole | null;
  onSuccess: () => void;
  onClose: () => void;
}

export interface AppModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode | null;
  width?: number;
}

export interface CommonInputProps extends InputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
}
export interface CustomTableProps<T> extends TableProps<T> {
  total?: number;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  showPagination?: boolean;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface StatCardProps {
  icon: ReactNode;
  value: number | string;
  label: string;
  iconBg?: string;
  iconColor?: string;
}

export interface AuthContextValue {
  user: User | null;
  hasPermission: (resource: string, action: string) => boolean;
  logout: () => void;
}

export interface SocketContextValue {
  socket: Socket | null;
  connected: boolean;
}

export interface PermissionRow {
  resource: string;
  actions: string[];
}

export interface UserDetailModalProps {
  user: User | null;
  onClose: () => void;
}

export interface RolesListResponse {
  status: boolean;
  data: UserRole[];
  message: string;
}

export interface RoleResponse {
  status: boolean;
  data: UserRole;
  message: string;
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  admins: number;
}

export interface UserStatsResponse {
  status: boolean;
  data: UserStats;
  message: string;
}

export interface UsersListResponse {
  status: boolean;
  data: {
    list: User[];
    page: number;
    size: number;
    total: number;
  };
  message: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role_id: string;
  status: "active" | "inactive";
}

export interface UpdateUserPayload {
  name: string;
  role_id: string;
  status: "active" | "inactive";
}
