import { Button, Tag, Tooltip, type TableColumnType } from "antd";
import type { User, UserRole } from "../../types";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const columns: (
  handleView: (user: User) => void,
  handleEdit: (user: User) => void,
  handleDelete: (user: User) => void,
) => TableColumnType<User>[] = (handleView, handleEdit, handleDelete) => [
  {
    title: "S.No",
    key: "sno",
    width: 70,
    render: (_: unknown, __: User, index: number) => (
      <span className="text-text-secondary">{index + 1}</span>
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
  {
    title: "Actions",
    key: "actions",
    render: (_: unknown, record: User) => (
      <div className="flex items-center gap-2">
        <Tooltip title="View">
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            className="text-text-secondary hover:text-primary"
            onClick={() => handleView(record)}
          />
        </Tooltip>
        <Tooltip title="Edit">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            className="text-text-secondary hover:text-primary"
            onClick={() => handleEdit(record)}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            className="text-text-secondary hover:text-error"
            onClick={() => handleDelete(record)}
          />
        </Tooltip>
      </div>
    ),
  },
];
