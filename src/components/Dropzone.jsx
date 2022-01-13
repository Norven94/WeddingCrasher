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

    upload(acceptedFiles, currentUser.uid);

    // acceptedFiles.map(file => {
    //   upload(file, currentUser.uid);
    // })
  }, []);

  useEffect(() => {
    if (imageDetails) {
      setImages([...images, {
        path: imageDetails.path,
        url: imageDetails.url,
        uuid: imageDetails.uuid,
        imageReference: imageDetails.imageReference
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
            {uploadProgress && uploadProgress.map((progress, i) => (
              <p key={i}>{progress}</p>
            ))}
            {isError && <p>{isError}</p>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
