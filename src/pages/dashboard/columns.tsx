import { Tag, type TableColumnType } from "antd";
import type { User, UserRole } from "../../types";

export const columns: (page?: number, size?: number) => TableColumnType<User>[] = (page = 1, size = 5) => [
  {
    title: "S.No",
    key: "sno",
    width: 70,
    render: (_: unknown, __: User, index: number) => (
      <span className="text-text-secondary">{(page - 1) * size + index + 1}</span>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: string) => (
      <span className="font-medium text-text-primary">{name}</span>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email: string) => (
      <span className="text-text-secondary">{email}</span>
    ),
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (role: UserRole) => (
      <Tag
        className="rounded-md capitalize"
        color={role?.name === "admin" ? "blue" : "default"}
      >
        {role?.name ?? "—"}
      </Tag>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: "active" | "inactive") => (
      <span
        className={`flex items-center gap-1.5 text-sm ${
          status === "active" ? "text-success" : "text-text-secondary"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full inline-block ${
            status === "active" ? "bg-success" : "bg-text-secondary"
          }`}
        />
        {status}
      </span>
    ),
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: string) => (
      <span className="text-text-secondary">
        {new Date(date).toISOString().split("T")[0]}
      </span>
    ),
  },
];
