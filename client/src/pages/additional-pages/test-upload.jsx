import React, { useState } from "react";
import { storage } from "../../utils/firebase"; // Import Firebase storage instance
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const FileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const file = e.target[0]?.files[0];

    if (!file) return;
    setIsLoading(true);

    const storageRef = ref(storage, `testing/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const fileProgress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(fileProgress);
      },
      (error) => {
        alert(error);
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImgUrl(downloadUrl);
          setIsLoading(false);
        });
      }
    );
  };
  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col m-5  space-y-3"
      >
        <input type="file" className="file-input file-input-bordered" />
        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-primary w-full"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <h1>Upload</h1>
          )}
        </button>
      </form>
      {imgUrl && <img src={imgUrl} />}
    </div>
  );
};

export default FileUpload;
