import { Tag } from "antd";
import AppModal from "../../components/AppModal";
import type { User } from "../../types";

interface UserDetailModalProps {
  user: User | null;
  onClose: () => void;
}

function UserDetailModal({ user, onClose }: UserDetailModalProps) {
  if (!user) return null;

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    {
      label: "Role",
      value: (
        <Tag
          className="rounded-md capitalize"
          color={user.role?.name === "admin" ? "blue" : "default"}
        >
          {user.role?.name ?? "—"}
        </Tag>
      ),
    },
    {
      label: "Status",
      value: (
        <span
          className={`flex items-center gap-1.5 text-sm ${
            user.status === "active" ? "text-success" : "text-text-secondary"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full inline-block ${
              user.status === "active" ? "bg-success" : "bg-text-secondary"
            }`}
          />
          {user.status}
        </span>
      ),
    },
    {
      label: "Created",
      value: new Date(user.createdAt).toISOString().split("T")[0],
    },
    {
      label: "Updated",
      value: new Date(user.updatedAt).toISOString().split("T")[0],
    },
  ];

  const permissions = user.role?.permissions ?? {};
  const permissionEntries = Object.entries(permissions);

  const actionColors: Record<string, string> = {
    read: "green",
    write: "blue",
    delete: "red",
  };

  return (
    <AppModal open={!!user} title="User Details" onClose={onClose}>
      <div className="divide-y divide-border-subtle">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex items-center py-3 gap-4">
            <span className="w-24 shrink-0 text-sm text-text-secondary">
              {label}
            </span>
            <span className="text-sm text-text-primary">{value}</span>
          </div>
        ))}

        {permissionEntries.length > 0 && (
          <div className="py-3 gap-4">
            <span className="text-sm text-text-secondary">Permissions</span>
            <div className="mt-2 space-y-2">
              {permissionEntries.map(([resource, actions]) => (
                <div key={resource} className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-sm capitalize text-text-primary font-medium">
                    {resource}
                  </span>
                  <div className="flex gap-1 flex-wrap">
                    {(actions as string[]).map((action) => (
                      <Tag
                        key={action}
                        color={actionColors[action] ?? "default"}
                        className="capitalize rounded-md"
                      >
                        {action}
                      </Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppModal>
  );
}

export default UserDetailModal;
