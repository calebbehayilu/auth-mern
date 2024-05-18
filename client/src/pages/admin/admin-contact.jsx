import AdminInboxTable from "./components/admin-tables";
import AdminTable from "./components/admin-tables";

const AdminContact = () => {
  return (
    <div className="flex m-3">
      <div className="space-y-5">
        <h1 className="text-2xl font-semibold m-3">Inbox</h1>
        <AdminInboxTable />
      </div>
    </div>
  );
};

export default AdminContact;
