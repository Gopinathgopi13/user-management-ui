import { useEffect, useState } from "react";
import { Button, message, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CustomTable from "../../components/CustomTable";
import Spinner from "../../components/Spinner";
import AppModal from "../../components/AppModal";
import RoleForm from "./RoleForm";
import { columns } from "./columns";
import type { UserRole } from "../../types";
import { getRoles, deleteRole } from "../../services/api/roles.api";
import { useAuth } from "../../hooks/useAuth";

function RoleManagement() {
  const { hasPermission } = useAuth();
  const canWrite = hasPermission("roles", "write");
  const canDelete = hasPermission("roles", "delete");

  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [editRole, setEditRole] = useState<UserRole | null>(null);
  const [viewRole, setViewRole] = useState<UserRole | null>(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const { data } = await getRoles();
      if (data.status) setRoles(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (role: UserRole) => setEditRole(role);
  const handleView = (role: UserRole) => setViewRole(role);

  const handleDelete = async (role: UserRole) => {
    try {
      await deleteRole(role.id);
      message.success("Role deleted successfully");
      fetchRoles();
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Failed to delete role");
    }
  };

  return (
    <div className="space-y-4">
      {loading && <Spinner isLoading={loading} />}

      <div className="flex items-center justify-end">
        {canWrite && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-primary"
            onClick={() => setCreateModal(true)}
          >
            Create Role
          </Button>
        )}
      </div>

      <AppModal
        open={createModal}
        title="Create Role"
        onClose={() => setCreateModal(false)}
      >
        <RoleForm
          onClose={() => setCreateModal(false)}
          onSuccess={fetchRoles}
        />
      </AppModal>

      <AppModal
        open={!!editRole}
        title="Edit Role"
        onClose={() => setEditRole(null)}
      >
        <RoleForm
          role={editRole}
          onClose={() => setEditRole(null)}
          onSuccess={fetchRoles}
        />
      </AppModal>

      <AppModal
        open={!!viewRole}
        title="Role Details"
        onClose={() => setViewRole(null)}
      >
        {viewRole && (
          <div className="space-y-4 pt-2">
            <div>
              <span className="text-sm text-text-secondary">Name</span>
              <p className="font-medium text-text-primary capitalize mt-0.5">
                {viewRole.name}
              </p>
            </div>
            <div>
              <span className="text-sm text-text-secondary">Permissions</span>
              {Object.keys(viewRole.permissions).length === 0 ? (
                <p className="text-sm text-text-secondary mt-0.5">No permissions assigned</p>
              ) : (
                <div className="space-y-2 mt-1">
                  {Object.entries(viewRole.permissions).map(([resource, actions]) => (
                    <div key={resource} className="flex items-center gap-2">
                      <span className="text-sm font-medium capitalize w-24 shrink-0">
                        {resource}
                      </span>
                      <div className="flex gap-1 flex-wrap">
                        {actions.map((action) => (
                          <Tag key={action} className="capitalize">
                            {action}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </AppModal>

      <div className="bg-white rounded-xl border border-border-subtle shadow-sm p-4">
        <CustomTable<UserRole>
          columns={columns(handleEdit, handleView, handleDelete, canWrite, canDelete)}
          dataSource={roles}
          rowKey="id"
          showPagination={false}
        />
      </div>
    </div>
  );
}

export default RoleManagement;
