import AdminTable from "./components/admin-tables";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center m-5">
      <h1 className="text-2xl font-semibold m-3">Admin Dashboard</h1>
      <div className="pt-16">
        <AdminTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
