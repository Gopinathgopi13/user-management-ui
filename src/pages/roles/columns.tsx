import { Button, Popconfirm, Tooltip, type TableColumnType } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import type { UserRole } from "../../types";

export const columns: (
  handleEdit: (role: UserRole) => void,
  handleView: (role: UserRole) => void,
  handleDelete: (role: UserRole) => void,
  canEdit?: boolean,
  canDelete?: boolean,
) => TableColumnType<UserRole>[] = (handleEdit, handleView, handleDelete, canEdit = true, canDelete = true) => [
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
      <span className="font-medium text-text-primary capitalize">{name}</span>
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
    title: "Actions",
    key: "actions",
    render: (_: unknown, record: UserRole) => (
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
        {canEdit && (
          <Tooltip title="Edit">
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              className="text-text-secondary hover:text-primary"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
        )}
        {canDelete && (
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete role"
              description="Are you sure you want to delete this role?"
              onConfirm={() => handleDelete(record)}
              okText="Delete"
              okButtonProps={{ danger: true }}
              cancelText="Cancel"
            >
              <Button
                type="text"
                size="small"
                icon={<DeleteOutlined />}
                className="text-text-secondary hover:text-error"
              />
            </Popconfirm>
          </Tooltip>
        )}
      </div>
    ),
  },
];
