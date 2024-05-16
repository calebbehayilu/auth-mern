import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { getCurrentUser } from "../utils/auth";
import { useEffect, useState } from "react";
import Drawer from "../components/drawer";
import apiClient from "../services/api-client";
import { useQuery } from "@tanstack/react-query";
import Footer from "../components/footer";

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
  }, [data]);
  return (
    <div className="">
      <Drawer setIsOpen={setIsOpen} isOpen={isOpen} />
      <main className="">
        <Navbar
          currentUser={currentUser}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          isRead={data}
        />

        <div className="pt-28">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
