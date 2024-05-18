import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { BsPaperclip } from "react-icons/bs";
import { sort } from "fast-sort";
import { getCurrentUser } from "../utils/auth";

const Notification = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const {
    data: notification,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () =>
      apiClient.get("/notification").then((res) => {
        return res.data;
      }),
  });

  const data = sort(notification).desc("date");

  const onRead = async (id, postId) => {
    await apiClient.put(`/notification/${id}`, { isRead: true }).then((res) => {
      refetch();
    });
    if (user.role == "employer") return navigate(`/employer/${postId}`);
    if (user.role == "job_seeker") return navigate(`/jobdetail/${postId}`);
  };
  const getIsReadClasses = (isRead) => {
    let classes = isRead == false ? "btn btn-primary" : "btn btn-neutral";
    return classes;
  };

  return (
    <div className="flex justify-center">
      {isLoading && (
        <span className="loading loading-spinner loading-md"></span>
      )}
      <div>
        {data &&
          data.map((notification) => (
            <div
              key={notification._id}
              className="card card-bordered card-side bg-base-100 shadow-xl m-3"
            >
              <div className="card-body">
                <h2 className="card-title">
                  {notification.type == "REQESTED" ? (
                    <>Requested</>
                  ) : (
                    <>Accepted</>
                  )}
                </h2>
                <p className="flex flex-col gap-3">
                  <span className="flex">
                    <BiUser size={25} />
                    <Link
                      to={`/profile/${notification.fromId._id}`}
                      className="font-bold link link-primary"
                    >
                      {notification.fromId.name}
                    </Link>
                  </span>

                  <span className="flex">
                    <BsPaperclip size={25} />
                    <Link
                      to={`/jobDetail/${notification.postId._id}`}
                      className="font-medium hover:text-gray-400"
                    >
                      {notification.postId.title}
                    </Link>
                  </span>
                </p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => {
                      onRead(notification._id, notification.postId._id);
                    }}
                    className={getIsReadClasses(notification.isRead)}
                  >
                    Read
                  </button>
                </div>
              </div>
            </div>
          ))}

        {data?.length == 0 && (
          <div>
            <h1 className="text-warning text-3xl text-center font-semibold m-5">
              There are Notifications.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
