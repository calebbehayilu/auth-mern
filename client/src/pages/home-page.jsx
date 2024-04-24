import React from "react";
import Sidebar from "../components/sidebar";
import PostCard from "../components/home-page/post-card";

const posts = [
  {
    id: "1",
    title: "Facebook ad specialist needed for product launch",
    location: "Harar",
    discription:
      "We are looking for a talented and passionate full-stack website creator to join our team! In this role, you will be responsible for the entire website development lifecycle, from design and user interface (UI) development to back-end functionality and database management.",
    tags: ["C#", "API", "Backend"],
    postDate: "20-04-2024",
    minAmount: "20",
    jobDuration: "Month",
    maxAmount: "200",
    user: {
      name: "Grey Lu",
      email: "lugray30@gmail.com",
    },
  },
  {
    id: "2",
    title: "Facebook ad specialist needed for product launch",
    location: "Harar",
    discription:
      "We are looking for a talented and passionate full-stack website creator to join our team! In this role, you will be responsible for the entire website development lifecycle, from design and user interface (UI) development to back-end functionality and database management.",
    tags: ["C#", "API", "Backend"],
    postDate: "20-04-2024",
    minAmount: "20",
    jobDuration: "Month",
    maxAmount: "200",
    user: {
      name: "Grey Lu",
      email: "lugray30@gmail.com",
    },
  },
];

const HomePage = () => {
  if (!posts) return <h1>No Post found</h1>;
  return (
    <div className="mx-auto">
      <div className="lg:grid grid-cols-12 gap-3 flex flex-col">
        <div className="lg:col-span-3 px-3">
          <Sidebar />
        </div>
        <div className="lg:col-span-6 rounded-lg">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
