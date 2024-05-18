import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../services/api-client";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Success from "../../../components/success";

const AdminUsersTable = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const pagination = { page, pageSize };
  const [confirm, setConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const {
    data: tableContent,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users_admin", pagination],
    queryFn: () =>
      apiClient
        .get(`/user/all`, {
          params: {
            page: pagination.page,
          },
        })
        .then((res) => {
          return res.data;
        }),
    staleTime: 1 * 60 * 1000,
  });

  const AccountDelete = async () => {
    if (confirm) {
      apiClient.delete(`/user/${userId}`).then((res) => {
        if (res.data === true) {
          setSuccess(true);
          setUserId("");
          refetch();
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        }
      });
    }
  };
  const onDelete = (_id) => {
    setUserId(_id);
    document.getElementById("modal").showModal();
  };
  useEffect(() => {
    AccountDelete();
  }, [confirm]);

  if (isLoading) return <span className="loading loading-spinner"></span>;

  return (
    <div className="overflow-hidden rounded-lg">
      {success && <Success message={"User have been deleted."} />}
      <table className="w-full text-sm text-left rtl:text-right text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableContent &&
            tableContent.map((contact) => (
              <tr
                key={contact._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link to={`/profile/${contact._id}`}>{contact.name}</Link>
                </th>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4">{toTitleCase(contact.role)}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => {
                      onDelete(contact._id);
                    }}
                    className="font-medium text-error  hover:underline"
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
      <dialog id="modal" className="modal">
        <div className="modal-box w-fit">
          <h3 className="font-bold text-lg text-center w-30">
            Are You Sure You Want To Delete This Account?
          </h3>
          <div className="flex justify-evenly m-5">
            <form method="dialog" className="btn btn-accent">
              <button>close</button>
            </form>
            <button
              className="btn btn-error"
              onClick={() => {
                setConfirm(true);
              }}
            >
              Delete
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
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
export default AdminUsersTable;
