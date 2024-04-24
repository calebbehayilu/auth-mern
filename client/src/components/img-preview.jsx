import React from "react";
import getAvatar from "./../utils/create-avatar";
const ImgPreview = ({ user, size }) => {
  const imgSize = (size) => {
    return `bg-slate-600 text-neutral-content rounded-full ${size}`;
  };
  return (
    <div className="mr-3">
      {user && (
        <>
          {user?.photoURL ? (
            <div className={imgSize(size)}>
              <img src={user.photoURL} />
            </div>
          ) : (
            <div className="avatar placeholder">
              <div className={imgSize(size)}>
                <span>{getAvatar(user?.name)}</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImgPreview;
