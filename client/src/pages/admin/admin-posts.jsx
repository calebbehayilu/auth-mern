import AdminPostsTable from "./components/admin-posts-table";

const AdminPosts = () => {
  return (
    <div className="flex m-3">
      <div className="space-y-5">
        <h1 className="text-2xl font-semibold m-3">Admin Posts</h1>
        <AdminPostsTable />
      </div>
    </div>
  );
};

export default AdminPosts;
