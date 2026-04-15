import { NavLink } from "react-router-dom";
import {
  DashboardOutlined,
  TeamOutlined,
  SafetyOutlined,
  UserOutlined,
} from "@ant-design/icons";

const navItems = [
  { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
  { label: "Users", icon: <TeamOutlined />, path: "/users" },
  { label: "Roles", icon: <SafetyOutlined />, path: "/roles" },
  { label: "Profile", icon: <UserOutlined />, path: "/profile" },
];

function Sidebar() {
  return (
    <aside className="flex flex-col w-60 min-h-screen bg-[#0f172a] text-white shrink-0">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold">
          A
        </div>
        <span className="text-base font-semibold tracking-wide">
          AdminPanel
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
