import AdminTable from "./components/admin-tables";
import AdminUsersTable from "./components/admin-users-table";

const AdminUsers = () => {
  return (
    <div className="flex  m-3">
      <div className="space-y-5">
        <h1 className="text-2xl font-semibold m-3">Admin Users</h1>
        <AdminUsersTable />
      </div>
    </div>
  );
};

export default AdminUsers;
