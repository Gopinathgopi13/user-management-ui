import type { TableColumnType } from "antd";
import type { UserRole } from "../../types";

export const columns: () => TableColumnType<UserRole>[] = () => [
  {
    title: "S.No",
    key: "sno",
    width: 70,
    render: (_: unknown, __: UserRole, index: number) => (
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
    title: "Permissions",
    dataIndex: "permissions",
    key: "permissions",
    render: (permissions: Record<string, string[]>) => (
      <span className="text-text-secondary capitalize">
        {Object.keys(permissions).join(", ")}
      </span>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (description: string) => (
      <span className="font-medium text-text-primary">
        {description || "-"}
      </span>
    ),
  },
];
