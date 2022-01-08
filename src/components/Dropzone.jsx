import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useDataContext } from "../contexts/DataContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useUploadImage } from '../hooks/useUploadImage'

const Dropzone = () => {
  const { currentUser } = useAuthContext()
  const { images, setImages, setImageUploadComplete } = useDataContext()
  const { upload, uploadProgress, imageDetails, isError, isLoading } = useUploadImage()

  const onDrop = useCallback((acceptedFiles) => {

    if (!acceptedFiles.length) {
      return;
    }

    upload(acceptedFiles[0], currentUser.uid);
  }, []);

  useEffect(() => {
    if (imageDetails) {
      setImages([...images, {
        path: imageDetails.path,
        url: imageDetails.url,
        uuid: imageDetails.uuid
      }])
    }
  }, [imageDetails])

  useEffect(() => {
    setImageUploadComplete(isLoading)
  }, [isLoading])

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
  } = useDropzone({
    accept: "image/gif, image/jpeg, image/png, image/webp",
    onDrop,
    maxFiles: 1,
  });

  return (
    <div {...getRootProps()} id="dropzone-container">
      <input {...getInputProps()} />

    <p>Add images</p>
      {acceptedFiles.length > 0 && (
        <div>
          <ul>
            {acceptedFiles.map((file) => (
              <li key={file.name}>
                {file.name} ({Math.round(file.size / 1024)} kb)
              </li>
            ))}
            {uploadProgress && <p>{uploadProgress}</p>}
            {isError && <p>{isError}</p>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
