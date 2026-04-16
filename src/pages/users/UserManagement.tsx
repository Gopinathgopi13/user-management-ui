import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Modal, Select, message, notification } from "antd";
import { PlusOutlined, UserAddOutlined } from "@ant-design/icons";
import SearchInput from "../../components/SearchInput";
import CustomTable from "../../components/CustomTable";
import Spinner from "../../components/Spinner";
import AppModal from "../../components/AppModal";
import UserForm from "./UserForm";
import UserDetailModal from "./UserDetailModal";
import type { User, UserRole } from "../../types";
import { columns } from "./columns";
import { getUsers, deleteUser } from "../../services/api/users.api";
import { getRoles } from "../../services/api/roles.api";
import { useAuth } from "../../hooks/useAuth";
import { useSocket } from "../../context/SocketContext";

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [roleId, setRoleId] = useState<string>("");
  const [pagination, setPagination] = useState({ page: 1, size: 5, total: 0 });
  const [createModal, setCreateModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  const { hasPermission } = useAuth();
  const canCreate = hasPermission("users", "create");
  const canUpdate = hasPermission("users", "update");
  const canDelete = hasPermission("users", "delete");

  const { socket } = useSocket();
  const [notifApi, notifContextHolder] = notification.useNotification();

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSearch = useRef(search);

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    fetchUsers(pagination.page, pagination.size, search, roleId);
  }, [pagination.page, pagination.size, search, roleId]);

  const fetchRoles = async () => {
    try {
      const { data } = await getRoles();
      if (data.status) setRoles(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = useCallback(
    async (page: number, size: number, searchVal: string, role_id: string) => {
      setLoading(true);
      try {
        const { data } = await getUsers({
          page,
          size,
          ...(searchVal ? { search: searchVal } : {}),
          ...(role_id ? { role_id } : {}),
        });
        if (data.status) {
          const { list, total } = data.data;
          setUsers(list);
          setPagination((prev) => ({ ...prev, total }));
        } else {
          message.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!socket) return;
    const handler = (user: User) => {
      notifApi.info({
        message: "New User Created",
        description: `${user.name} (${user.email}) has been added.`,
        icon: <UserAddOutlined style={{ color: "#6366f1" }} />,
        placement: "topRight",
        duration: 5,
      });
      setPagination((prev) => ({ ...prev, page: 1 }));
      fetchUsers(1, pagination.size, search, roleId);
    };
    socket.on("user:created", handler);
    return () => { socket.off("user:created", handler); };
  }, [socket, notifApi, pagination.size, search, roleId, fetchUsers]);

  const handleSearch = (value: string) => {
    pendingSearch.current = value;
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setSearch(pendingSearch.current);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 400);
  };

  const handleRoleFilter = (value: string | undefined) => {
    setRoleId(value ?? "");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleView = (user: User) => setViewUser(user);
  const handleEdit = (user: User) => setEditUser(user);
  const handleDeleteClick = (user: User) => setDeleteTarget(user);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteUser(deleteTarget.id);
      message.success("User deleted successfully");
      setDeleteTarget(null);
      fetchUsers(pagination.page, pagination.size, search, roleId);
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  const handleCreateSuccess = () => {
    if (pagination.page === 1) {
      fetchUsers(1, pagination.size, search, roleId);
    } else {
      setPagination((prev) => ({ ...prev, page: 1 }));
    }
  };

  const handleEditSuccess = () => {
    fetchUsers(pagination.page, pagination.size, search, roleId);
  };

  return (
    <div className="relative space-y-4">
      {notifContextHolder}
      {loading && <Spinner isLoading={loading} fullscreen={false} />}

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <SearchInput
            placeholder="Search users..."
            value={search}
            onChange={handleSearch}
          />
          <Select
            placeholder="All Roles"
            allowClear
            value={roleId || undefined}
            onChange={handleRoleFilter}
            className="w-36"
            options={roles.map((r) => ({ label: r.name, value: r.id }))}
          />
        </div>

        {canCreate && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-primary"
            onClick={() => setCreateModal(true)}
          >
            Create User
          </Button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-border-subtle shadow-sm p-4">
        <CustomTable<User>
          columns={columns(handleView, handleEdit, handleDeleteClick, canUpdate, canDelete)}
          dataSource={users}
          rowKey="id"
          total={pagination.total}
          pageSize={pagination.size}
          currentPage={pagination.page}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        />
      </div>
      
      <AppModal
        open={createModal}
        title="Create User"
        onClose={() => setCreateModal(false)}
      >
        <UserForm
          roles={roles}
          onClose={() => setCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      </AppModal>

      <AppModal
        open={!!editUser}
        title="Edit User"
        onClose={() => setEditUser(null)}
      >
        <UserForm
          key={editUser?.id}
          roles={roles}
          user={editUser}
          onClose={() => setEditUser(null)}
          onSuccess={handleEditSuccess}
        />
      </AppModal>

      <UserDetailModal user={viewUser} onClose={() => setViewUser(null)} />

      <Modal
        centered
        open={!!deleteTarget}
        title="Delete User"
        onCancel={() => setDeleteTarget(null)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>,
          <Button
            key="confirm"
            danger
            type="primary"
            loading={deleting}
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>,
        ]}
      >
        <p className="text-text-secondary">
          Are you sure you want to delete{" "}
          <span className="font-medium text-text-primary">
            {deleteTarget?.name}
          </span>
          ? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}

export default UserManagement;
