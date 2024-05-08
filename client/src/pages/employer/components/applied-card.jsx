/* eslint-disable react/prop-types */
import formatDate from "../../../utils/formatdate";

const AppliedCard = ({ applier }) => {
  return (
    <div
      key={applier.id}
      className="flex justify-between items-center bg-gray-800  border-b border-gray-700 "
    >
      <p scope="row" className="flex px-6 py-4 font-medium text-white">
        {applier.userId.name}
      </p>
      <div className="w-fit"></div>
      <div className="flex justify-start items-center">
        <p className="px-6 py-4">{formatDate(applier.appliedTime)}</p>
        <div className="px-6 py-4">
          <section className="px-6 py-4 w-32">
            <a href="#" className="font-medium hover:underline ">
              {applier?.accept ? (
                <span className="text-red-500">Remove</span>
              ) : (
                <span className="text-blue-500">Accept</span>
              )}
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AppliedCard;
