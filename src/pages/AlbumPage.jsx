import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSnapshotDocument } from "../hooks/useSnapshotDocument";
import { useUpdateAlbum } from '../hooks/useUpdateAlbum'
import { useDataContext } from "../contexts/DataContext";
import { deleteImage } from "../api/routes/albums";
import ImageGrid from "../components/ImageGrid";
import Dropzone from "../components/Dropzone";
import SuperButton from "../components/SuperButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const AlbumPage = () => {
  const { id } = useParams();
  const { data, loading } = useSnapshotDocument(id);
  const { updateAlbum } = useUpdateAlbum()
  const { images, setImages } = useDataContext();

  const [isEditing, setIsEditing] = useState(false)
  const albumNameRef = useRef()

  useEffect(() => {
    if (data) {
      setImages(data.images);
    }
  }, [data]);

  const handleRemoveImage = (params) => {
    deleteImage(params.path);
    setImages((images) => images.filter((image) => image.uuid !== params.uuid));
  };

  const updateName = e => {
    e.preventDefault()
    const newName = {
      name: albumNameRef.current.value
    }
    const result = updateAlbum(newName, data.id)
    console.log(result)
    setIsEditing(false)
  }
  

  return (
    <div className="pageContainer">
      {loading && <p>Loading...</p>}
      {data && (
        <div className="album-container">
          <div className="mt-2 heading-container">
            {isEditing ? (
              <form className="album-name-container" onSubmit={updateName}>
                <input type="text" placeholder="Enter new album name" ref={albumNameRef} />
                <SuperButton className="ml-2" title="change" type="submit" />
              </form>
            ): (
              <div className="album-name-container">
                <h1>{data.name}</h1>
                <div className="fa-icon">
                  <FontAwesomeIcon icon={faEdit} onClick={() => setIsEditing(true)}/>
                </div>
              </div>
            )}
            <SuperButton className="ml-4 save-btn" title="Save" />
          </div>
          
          <Dropzone />
          <ImageGrid images={images} removeImage={handleRemoveImage} />
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
