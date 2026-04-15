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
