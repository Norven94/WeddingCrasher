import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const { images, setImages, selectedImages, setSelectedImages } = useDataContext();

  const [isEditing, setIsEditing] = useState(false)
  const [deleteQuestion, setDeleteQuestion] = useState(false)
  const [lastImageDelete, setLastImageDelete] = useState(false)
  const [shareQuestion, setShareQuestion] = useState(false)
  const albumNameRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      console.log(data)
      setImages(data.images);
    }
    setSelectedImages([])
  }, [data]);

  useEffect(() => {
    if (data) {
      updateHook.updateAlbum({images}, data.id)
    }
  }, [images])

  const handleRemoveImage = (params) => {
    if (!updateHook.isLoading && !deleteImageHook.isLoading) {
      //If only one image remains in album, ask to delete hole album instead
      if (images.length < 2) {
        setLastImageDelete(true)
      } else {
        //Remove the image from the album images array
        const noRemovedImages = images.filter((image) => image.uuid !== params.uuid)
        updateHook.updateAlbum({images: noRemovedImages}, data.id)
        //Try to remove the image doc and storage if there is no copy of the image in other albums
        deleteImageHook.deleteImage(params);
        setImages(noRemovedImages);
      }
    }
  };

  const updateName = e => {
    e.preventDefault()

    if (!updateHook.isLoading) {
      updateHook.updateAlbum({name: albumNameRef.current.value}, data.id)
      setIsEditing(false)
    }
  }

  const createFromSelection = () => {
    navigate("/create")
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
            ) : (
              <div className="album-name-container">
                <h1>{data.name}</h1>
                <div className="ml-2 fa-icon">
                  <FontAwesomeIcon icon={faEdit} onClick={() => setIsEditing(true)}/>
                </div>
              </div>
            )}
            <SuperButton className={`${updateHook.isLoading && "disabled"} ml-4 save-btn`} title="Share album" onClick={() => setShareQuestion(true)} />
          </div>
          <div className="my-2 create-selected-container">
            <span className="create-on-selected" onClick={createFromSelection}>Create new album based on selected images</span>
          </div>
          {updateHook.success && <p>Successfully updated changes</p>}
          {updateHook.error && <p>{updateHook.error}</p>}
          <Dropzone />
          <ImageGrid images={images} removeImage={handleRemoveImage} />
        </div>
      )}
      {(deleteQuestion || lastImageDelete || shareQuestion) && (
        <PopQuestion albumDetails={data} type={lastImageDelete ? "lastImage" : deleteQuestion ? "delete" : "share"} setDeleteQuestion={setDeleteQuestion} setShareQuestion={setShareQuestion} setLastImageDelete={setLastImageDelete}/>
      )}
    </div>
  );
};

export default AlbumPage;
