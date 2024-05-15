import { useNavigate } from "react-router-dom";

const TableList = ({ posts, onDelete }) => {
  const navigate = useNavigate();
  if (posts == "") return null;
  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="hidden sm:table-cell px-6 py-3">
                Job Type
              </th>
              <th scope="col" className="hidden sm:table-cell px-6 py-3">
                Location
              </th>
              <th scope="col" className=" hidden sm:table-cell px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item) => (
              <tr
                key={item._id}
                className="border-b dark:bg-gray-800 dark:border-gray-700 "
              >
                <th
                  scope="row"
                  className="cursor-pointer px-6 py-4 font-medium  whitespace-nowrap text-white hover:text-blue-300"
                  onClick={() => {
                    navigate(`/jobdetail/${item.postId._id}`);
                  }}
                >
                  {item.postId.title}
                </th>
                <td className="hidden sm:table-cell px-6 py-4">
                  {item.postId.jobType}
                </td>
                <td className="hidden sm:table-cell px-6 py-4">
                  {item.postId.location}
                </td>
                <td className=" hidden sm:table-cell px-6 py-4">
                  ${item.postId.minAmount} - ${item.postId.maxAmount}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => {
                      onDelete(item.postId._id);
                    }}
                    className="font-medium dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableList;
