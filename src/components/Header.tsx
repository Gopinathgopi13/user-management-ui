import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { logoutService } from "../services/api/auth.api";
import { clearAuthSession, getCookie } from "../utilities/auth";
import { REFRESH_TOKEN } from "../utilities/constant";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import Spinner from "./Spinner";

const routeTitles: Record<string, { title: string; description: string }> = {
  "/dashboard": { title: "Dashboard", description: "" },
  "/users": { title: "Users", description: "Manage users" },
  "/roles": { title: "Roles", description: "Manage roles" },
};

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const page = routeTitles[pathname];
  const [loading, setLoading] = useState(false);
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
      <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-border-subtle shrink-0">
        <div>
          <h1 className="text-base font-semibold text-text-primary">
            {page?.title}
          </h1>
          <p className="text-sm text-text-secondary">{page?.description}</p>
        </div>

        <div className="flex items-center gap-4">
          <Dropdown
            menu={{ items: userMenuItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <div className="flex items-center gap-2 cursor-pointer select-none">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white text-sm font-semibold">
                <UserOutlined />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-medium text-text-primary">
                  {user?.name ?? "User"}
                </p>
                <p className="text-xs text-text-secondary capitalize">
                  {user?.role?.name ?? ""}
                </p>
              </div>
              <DownOutlined className="text-xs text-text-secondary ml-1" />
            </div>
          </Dropdown>
        </div>
      </header>
    </>
  );
}

export default Header;
