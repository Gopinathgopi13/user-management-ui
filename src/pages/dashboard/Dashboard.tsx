import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import {
  TeamOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import StatCard from "../../components/StatCard";
import Spinner from "../../components/Spinner";
import { getUsers, getUserStats } from "../../services/api/users.api";
import CustomTable from "../../components/CustomTable";
import type { User, UserStats } from "../../types";
import { columns } from "./columns";
import { message } from "antd";

function Dashboard() {
  const [stats, setStats] = useState<UserStats>({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0,
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 5,
    total: 0,
  });

  const { socket } = useSocket();

  useEffect(() => {
    handleFetchStats();
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handler = () => {
      handleFetchStats();
      handleFetchUsers(1, pagination.size);
      setPagination((prev) => ({ ...prev, page: 1 }));
    };
    socket.on("user:created", handler);
    return () => { socket.off("user:created", handler); };
  }, [socket, pagination.size]);

  useEffect(() => {
    handleFetchUsers(pagination.page, pagination.size);
  }, [pagination.page, pagination.size]);

  const handleFetchStats = async () => {
    setLoading(true);
    try {
      const { data } = await getUserStats();
      setStats(data.data);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchUsers = async (page: number, size: number) => {
    setLoading(true);
    try {
      const { data } = await getUsers({ page, size });
      if (data.status) {
        const { list, total } = data.data;
        setUsers(list);
        setPagination((prev) => ({ ...prev, total }));
      } else {
        message.error("Failed to fetch");
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: <TeamOutlined />,
      value: stats.total,
      label: "Total Users",
      iconBg: "#ede9fe",
      iconColor: "#6366f1",
    },
    {
      icon: <UserAddOutlined />,
      value: stats.active,
      label: "Active Users",
      iconBg: "#dcfce7",
      iconColor: "#16a34a",
    },
    {
      icon: <UserDeleteOutlined />,
      value: stats.inactive,
      label: "Inactive Users",
      iconBg: "#fef9c3",
      iconColor: "#ca8a04",
    },
    {
      icon: <SafetyOutlined />,
      value: stats.admins,
      label: "Admins",
      iconBg: "#fee2e2",
      iconColor: "#dc2626",
    },
  ];

  return (
    <div className="relative space-y-6">
      {loading && <Spinner isLoading={loading} fullscreen={false} />}
      <div className="flex gap-4">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <div className="bg-white rounded-xl border border-border-subtle shadow-sm p-4">
        <CustomTable<User>
          columns={columns(pagination.page, pagination.size)}
          dataSource={users}
          rowKey="id"
          total={pagination.total}
          pageSize={pagination.size}
          currentPage={pagination.page}
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        />
      </div>
    </div>
  );
}

export default Dashboard;
