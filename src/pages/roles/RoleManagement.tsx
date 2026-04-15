import { useEffect, useState } from "react";
import CustomTable from "../../components/CustomTable";
import { columns } from "./columns";
import type { UserRole } from "../../types";
import { getRoles } from "../../services/api/roles.api";
import Spinner from "../../components/Spinner";

function RoleManagement() {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      {loading && <Spinner isLoading={loading} />}
      <div className="bg-white rounded-xl border border-border-subtle shadow-sm p-4">
        <CustomTable<UserRole>
          columns={columns()}
          dataSource={roles}
          rowKey="id"
          showPagination={false}
        />
      </div>
    </>
  );
}

export default RoleManagement;
