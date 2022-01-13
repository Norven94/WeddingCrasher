import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useDataContext } from "../contexts/DataContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useUploadImage } from '../hooks/useUploadImage'
import { StyledDropZone } from "./styled/StyledDropZone";
import ProgressBar from "./ProgressBar";

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
    <StyledDropZone {...getRootProps()} >
      <input {...getInputProps()} />

    <p>Add images</p>
      {acceptedFiles.length > 0 && (
        <div>
          <div>
            <div>
              {uploadProgress && uploadProgress.map((progress, i) => (
                <div className="my-2" key={i}>
                  <ProgressBar completed={progress} />
                </div>
              ))}
            </div>
            {isError && <p>{isError}</p>}
          </div>
        </div>
      )}
    </StyledDropZone>
  );
};

export default Dropzone;
