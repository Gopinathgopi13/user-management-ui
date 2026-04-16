import {
  DownOutlined,
  KeyOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, message } from "antd";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutService } from "../services/api/auth.api";
import { clearAuthSession, getCookie } from "../utilities/auth";
import { REFRESH_TOKEN } from "../utilities/constant";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import Spinner from "./Spinner";
import ResetPasswordModal from "./ResetPasswordModal";

const routeTitles: Record<string, { title: string; description: string }> = {
  "/dashboard": {
    title: "Dashboard",
    description: "Overview of system metrics and recent activity."
  },
  "/users": {
    title: "Users",
    description: "Manage user accounts and their access."
  },
  "/roles": {
    title: "Roles",
    description: "Configure roles and permissions."
  },
};

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const page = routeTitles[pathname];
  const [loading, setLoading] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const { user } = useAuth();

  const handleLogout = async () => {
    const refreshToken = getCookie(REFRESH_TOKEN) ?? "";
    setLoading(true);
    try {
      const res: any = await logoutService(refreshToken);
      if (res.data.status) {
        clearAuthSession();
        navigate("/");
        message.info(res.message || "Logged out successfully");
      } else {
        message.error("Logout failed");
      }
    } catch {
      message.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "reset-password",
      icon: <KeyOutlined />,
      label: "Reset Password",
      onClick: () => setResetModalOpen(true),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      {loading && <Spinner isLoading={loading} />}
      <header className="sticky top-0 z-20 mx-6 my-4 shrink-0 rounded-2xl border border-border-subtle bg-surface/80 shadow-sm backdrop-blur-sm">
        <div className="flex min-h-20 items-center justify-between px-6 py-4">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-semibold text-text-primary">
              {page?.title ?? "Admin Panel"}
            </h1>
            <p className="truncate text-sm text-text-secondary">
              {page?.description}
            </p>
          </div>

          <Dropdown
            menu={{ items: userMenuItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <button
              type="button"
              className="group flex items-center gap-3 rounded-xl border border-border-subtle bg-white px-3 py-2 text-left shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-sm font-semibold text-white">
                <UserOutlined />
              </div>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm font-semibold text-text-primary">
                  {user?.name ?? "User"}
                </p>
                <p className="truncate text-xs capitalize text-text-secondary">
                  {user?.role?.name ?? "Member"}
                </p>
              </div>
              <DownOutlined className="text-[11px] text-text-secondary transition-transform group-hover:translate-y-[1px]" />
            </button>
          </Dropdown>
        </div>
      </header>

      <ResetPasswordModal
        open={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
      />
    </>
  );
}

export default Header;
