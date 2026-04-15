import { createContext } from "react";
import type { AuthContextValue, User } from "../types";
import { clearAuthSession, getCookie } from "../utilities/auth";
import { USER_DATA } from "../utilities/constant";


const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const raw = getCookie(USER_DATA);
  const user: User | null = raw ? JSON.parse(raw) : null;

  const hasPermission = (resource: string, action: string): boolean => {
    const perms = user?.role?.permissions ?? {};
    return (perms[resource] ?? []).includes(action);
  };

  const logout = () => {
    clearAuthSession();
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, hasPermission, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
