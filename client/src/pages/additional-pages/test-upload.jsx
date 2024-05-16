import React, { useState } from "react";
import { storage } from "../../utils/firebase"; // Import Firebase storage instance

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const uploadTask = storage.ref(`pdfs/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track upload progress
        },
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          // Handle successful upload
          console.log("File uploaded successfully");
        }
      );
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
