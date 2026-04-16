import { NavLink } from "react-router-dom";
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  {
    label: "Dashboard",
    icon: <DashboardOutlined />,
    path: "/dashboard",
    resource: null,
    action: null,
  },
  {
    label: "Users",
    icon: <TeamOutlined />,
    path: "/users",
    resource: "users",
    action: "read",
  },
  {
    label: "Roles",
    icon: <SafetyOutlined />,
    path: "/roles",
    resource: "roles",
    action: "read",
  },
];

type SidebarProps = {
  collapsed?: boolean;
  onToggle?: () => void;
};

function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const { hasPermission } = useAuth();

  const visibleItems = navItems.filter(
    (item) => !item.resource || hasPermission(item.resource, item.action!),
  );

  return (
    <aside
      className={`min-h-screen shrink-0 border-r border-border-subtle bg-surface/80 backdrop-blur-sm transition-all duration-300 ${
        collapsed ? "w-26" : "w-68"
      }`}
    >
      <div className="flex h-full flex-col px-4 py-5">
        {collapsed && (
          <button
            type="button"
            onClick={onToggle}
            className="mb-3 grid h-8 w-8 place-items-center self-center rounded-lg border border-border-subtle bg-white text-text-secondary transition-colors hover:text-primary"
            aria-label="Expand sidebar"
          >
            <MenuUnfoldOutlined />
          </button>
        )}
        <div
          className={`flex items-center border-b border-border-subtle px-2 pb-5 ${
            collapsed ? "justify-center px-0" : "justify-between gap-3"
          }`}
        >
          <div
            className={`flex items-center min-w-0 ${
              collapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-sm">
              A
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-text-primary">
                  Admin Panel
                </p>
                <p className="text-xs text-text-secondary">Management Console</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              type="button"
              onClick={onToggle}
              className="grid h-8 w-8 place-items-center rounded-lg border border-border-subtle bg-white text-text-secondary transition-colors hover:text-primary"
              aria-label="Collapse sidebar"
            >
              <MenuFoldOutlined />
            </button>
          )}
        </div>

        <nav className="flex-1 pt-5">
          <div className="space-y-1.5">
            {visibleItems.map(({ label, icon, path }) => (
              <NavLink
                key={path}
                to={path}
                title={collapsed ? label : undefined}
                className={({ isActive }) =>
                  `group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    collapsed ? "justify-center" : "gap-3"
                  } ${
                    isActive
                      ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                      : "text-text-secondary hover:bg-white hover:text-text-primary"
                  }`
                }
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-[15px] shadow-sm transition-colors group-hover:text-primary">
                  {icon}
                </span>
                {!collapsed && <span>{label}</span>}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
