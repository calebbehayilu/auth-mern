import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../services/api-client";
import { Link } from "react-router-dom";

const AdminInboxTable = () => {
  const {
    data: tableContent,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contact"],
    queryFn: () =>
      apiClient.get(`/contact`, {}).then((res) => {
        return res.data;
      }),
    staleTime: 1 * 60 * 1000,
  });

  if (isLoading) return <span className="loading loading-spinner"></span>;

  return (
    <div className="overflow-hidden rounded-lg">
      <table className=" text-sm text-left rtl:text-right text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Subject
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
                  {contact.email}
                </th>
                <td className="px-6 py-4">{contact.subject}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to="#"
                    className="font-medium text-error  hover:underline"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminInboxTable;
