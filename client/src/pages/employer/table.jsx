/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const TableList = ({ jobs }) => {
  if (!jobs.posts) return <h1>No posted jobs</h1>;
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Job Type
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only"></span>
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.posts.map((item) => (
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
                <td className="px-6 py-4">{item.jobType}</td>
                <td className="px-6 py-4">{item.location}</td>
                <td className="px-6 py-4">
                  ${item.minAmount} - ${item.maxAmount}
                </td>
                <td className="px-6 py-4 text-right">
                  <a href="#" className="font-medium dark: hover:underline">
                    {item?.active ? (
                      <span className="text-red-500">Close</span>
                    ) : (
                      <span className="text-blue-500">Open</span>
                    )}
                  </a>
                </td>

                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium dark:text-red-500 hover:underline"
                  >
                    Delete
                  </a>
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
