import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { getCurrentUser } from "../utils/auth";
import { useEffect, useState } from "react";
import Drawer from "../components/drawer";
import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";

const UserLayout = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tab, setTab] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["isRead"],
    queryFn: () =>
      apiClient.get("/notification/unread").then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    const user = getCurrentUser();
    refetch();
    setCurrentUser(user);
  }, []);
  return (
    <div>
      <Navbar
        currentUser={currentUser}
        {...tab}
        setTab={setIsOpen}
        isRead={data}
      />
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="pt-28">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
