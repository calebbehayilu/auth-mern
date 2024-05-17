import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../services/api-client";
import { Link } from "react-router-dom";
import { useState } from "react";

const AdminPostsTable = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const pagination = { page, pageSize };

  const {
    data: tableContent,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts_admin", pagination],
    queryFn: () =>
      apiClient
        .get(`/posts`, {
          params: {
            page: pagination.page,
          },
        })
        .then((res) => {
          return res.data;
        }),
    staleTime: 1 * 60 * 1000,
  });
  const onDelete = async (postId) => {
    await apiClient.delete(`/posts/${postId}`).then((res) => {
      if (!res.status !== 200) {
        setMessage("unexpected error has occoured");
      }
      setMessage("Applied job removed");
      refetch();
    });
  };
  const onActive = async (postId, active) => {
    await apiClient
      .put(`/posts/${postId}`, {
        active: active,
      })
      .then((res) => {
        if (!res.status !== 200) {
          setMessage("unexpected error has occoured");
        }
        active
          ? setMessage("Job post is inactive.")
          : setMessage("Job post is active.");
        refetch();
      });
  };
  if (isLoading) return <span className="loading loading-spinner"></span>;

  return (
    <div className="overflow-hidden rounded-lg">
      <table className=" text-sm text-left rtl:text-right text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <th scope="col" className="px-6 py-3">
            Name
          </th>
          <th scope="col" className="hidden lg:table-cell px-6 py-3">
            Job Type
          </th>
          <th scope="col" className="hidden lg:table-cell px-6 py-3">
            Location
          </th>
          <th scope="col" className="hidden sm:table-cell px-6 py-3">
            Amount
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="sr-only"></span>
          </th>
          <th scope="col" className="px-6 py-3">
            <span className="sr-only"></span>
          </th>
        </thead>
        <tbody>
          {tableContent &&
            tableContent.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  "
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={item._id} className="hover:text-blue-500">
                    {item.title}
                  </Link>
                </th>
                <td className="hidden lg:table-cell px-6 py-4">
                  {item.jobType}
                </td>
                <td className="hidden lg:table-cell px-6 py-4">
                  {item.location}
                </td>
                <td className="hidden sm:table-cell px-6 py-4">
                  ${item.minAmount} - ${item.maxAmount}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    href="#"
                    className="font-medium dark: hover:underline"
                    onClick={() => onActive(item._id, !item.active)}
                  >
                    {item?.active ? (
                      <span className="text-red-500">Close</span>
                    ) : (
                      <span className="text-blue-500">Open</span>
                    )}
                  </button>
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onDelete(item._id)}
                    className="font-medium dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {tableContent != [] ? (
        <div className="join grid grid-cols-2 mx-auto my-2 max-w-md ">
          <button
            className="join-item btn "
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page === 1}
          >
            Previous page
          </button>
          <button
            className="join-item btn "
            disabled={tableContent.length <= 9}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
function toTitleCase(inputString) {
  const words = inputString.split("_");

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  const result = capitalizedWords.join(" ");

  return result;
}
export default AdminPostsTable;
