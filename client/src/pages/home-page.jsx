import React, { useEffect } from "react";
import Sidebar from "../components/sidebar";
import PostCard from "../components/home-page/post-card";
import apiClient from "../services/api-client";
import useFetch from "./../utils/useFetch";

const HomePage = () => {
  apiClient.get("/posts");
  const { isLoading, error, data: posts } = useFetch("/posts");

  if (!posts) return <h1>No Post found</h1>;
  return (
    <div className="mx-auto">
      <div className="lg:grid grid-cols-12 gap-3 flex flex-col">
        <div className="lg:col-span-3 px-3">
          <Sidebar />
        </div>
        {isLoading && (
          <span className="loading loading-spinner loading-lg"></span>
        )}
        {posts && (
          <div className="lg:col-span-6 rounded-lg">
            {posts.map((post) => (
              <PostCard post={post} key={post._id} />
            ))}
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default HomePage;
