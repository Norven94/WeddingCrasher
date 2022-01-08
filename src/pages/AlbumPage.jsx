import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSnapshotDocument } from "../hooks/useSnapshotDocument";
import { useUpdateAlbum } from '../hooks/useUpdateAlbum'
import { useDataContext } from "../contexts/DataContext";
import { useDeleteImage } from "../hooks/useDeleteImage";
import ImageGrid from "../components/ImageGrid";
import Dropzone from "../components/Dropzone";
import SuperButton from "../components/SuperButton";
import PopQuestion from "../components/PopQuestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const AlbumPage = () => {
  const { id } = useParams();

  const { data, loading } = useSnapshotDocument(id);
  const updateHook = useUpdateAlbum()
  const deleteImageHook = useDeleteImage()
  const { images, setImages } = useDataContext();

  const [isEditing, setIsEditing] = useState(false)
  const [deleteQuestion, setDeleteQuestion] = useState(false)
  const [shareQuestion, setShareQuestion] = useState(false)
  const albumNameRef = useRef()

  useEffect(() => {
    if (data) {
      setImages(data.images);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const newImages = {
        images
      }
      updateHook.updateAlbum(newImages, data.id)
    }
  }, [images])

  const handleRemoveImage = (params) => {
    deleteImageHook.deleteImage(params.path, params.uuid);
    setImages((images) => images.filter((image) => image.uuid !== params.uuid));
  };

  const updateName = e => {
    e.preventDefault()

    if (!updateHook.isLoading) {
      const newName = {
        name: albumNameRef.current.value
      }
      updateHook.updateAlbum(newName, data.id)
      setIsEditing(false)
    }
  }

  return (
    <div className="pageContainer">
      {loading && <p>Loading...</p>}
      {data && (
        <div className="album-container">
          <div className="mt-2 heading-container">
            <SuperButton className={`${updateHook.isLoading && "disabled"} mr-4 secondary`} title="Delete album" onClick={() => setDeleteQuestion(true)} />
            {isEditing ? (
              <form className="album-name-container" onSubmit={updateName}>
                <input type="text" placeholder="Enter new album name" ref={albumNameRef} />
                <SuperButton className={`${updateHook.isLoading && "disabled"} ml-2`} title="Change" type="submit" />
              </form>
            ): (
              <div className="album-name-container">
                <h1>{data.name}</h1>
                <div className="ml-2 fa-icon">
                  <FontAwesomeIcon icon={faEdit} onClick={() => setIsEditing(true)}/>
                </div>
              </div>
            )}
            <SuperButton className={`${updateHook.isLoading && "disabled"} ml-4 save-btn`} title="Share album" onClick={() => setShareQuestion(true)} />
          </div>
          {updateHook.success && <p>Successfully updated changes</p>}
          {updateHook.error && <p>{updateHook.error}</p>}
          <Dropzone />
          <ImageGrid images={images} removeImage={handleRemoveImage} />
        </div>
      )}
      {(deleteQuestion || shareQuestion) && (
        <PopQuestion albumDetails={data} type={deleteQuestion ? "delete" : "share"} setDeleteQuestion={setDeleteQuestion} setShareQuestion={setShareQuestion} />
      )}
    </div>
  );
};

export default AlbumPage;
