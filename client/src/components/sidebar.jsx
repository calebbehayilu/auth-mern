import FormsSideBar from "./sidebar/forms-sidebar";

const Sidebar = () => {
  return (
    <div className="hidden lg:flex flex-col bg-base-200 rounded-lg">
      <h1 className="text-xl px-4 pt-4">Filters</h1>
      <div className="px-6 py-3">
        <h1 className="text-xl">Location</h1>
        <FormsSideBar />
      </div>
    </div>
  );
};

export default Sidebar;
