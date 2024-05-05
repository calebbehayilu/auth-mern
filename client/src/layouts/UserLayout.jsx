import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { getCurrentUser } from "../utils/auth";
import { useEffect, useState } from "react";
import Drawer from "../components/drawer";

const UserLayout = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tab, setTab] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);
  return (
    <div>
      <Navbar currentUser={currentUser} {...tab} setTab={setIsOpen} />
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
