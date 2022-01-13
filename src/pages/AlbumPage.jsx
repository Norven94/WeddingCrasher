import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnapshotDocument } from "../hooks/useSnapshotDocument";
import { useUpdateAlbum } from "../hooks/useUpdateAlbum";
import { useDataContext } from "../contexts/DataContext";
import { useDeleteImage } from "../hooks/useDeleteImage";
import ImageGrid from "../components/ImageGrid";
import Dropzone from "../components/Dropzone";
import { Button } from "../components/styled/Button";
import { InputText } from "../components/styled/InputText";
import { TextLink } from "../components/styled/TextLink";
import { Heading } from "../components/styled/Heading";
import { PageContainer } from "../components/styled/PageContainer";
import PopQuestion from "../components/PopQuestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";

const AlbumPage = () => {
  const { id } = useParams();

  const { data, loading } = useSnapshotDocument(id);
  const updateHook = useUpdateAlbum();
  const deleteImageHook = useDeleteImage();
  const { images, setImages, selectedImages, setSelectedImages } =
    useDataContext();

  const [isEditing, setIsEditing] = useState(false);
  const [deleteQuestion, setDeleteQuestion] = useState(false);
  const [lastImageDelete, setLastImageDelete] = useState(false);
  const [shareQuestion, setShareQuestion] = useState(false);
  const albumNameRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setImages(data.images);
    }
    setSelectedImages([]);
  }, [data]);

  useEffect(() => {
    if (data) {
      updateHook.updateAlbum({ images }, data.id);
    }
  }, [images]);

  const handleRemoveImage = (params) => {
    if (!updateHook.isLoading && !deleteImageHook.isLoading) {
      //If only one image remains in album, ask to delete hole album instead
      if (images.length < 2) {
        setLastImageDelete(true);
      } else {
        //Remove the image from the album images array
        const noRemovedImages = images.filter(
          (image) => image.uuid !== params.uuid
        );
        updateHook.updateAlbum({ images: noRemovedImages }, data.id);
        //Try to remove the image doc and storage if there is no copy of the image in other albums
        deleteImageHook.deleteImage(params);
        setImages(noRemovedImages);
      }
    }
  };

  const updateName = (e) => {
    e.preventDefault();

    if (!updateHook.isLoading) {
      if (albumNameRef.current.value !== "") {
        updateHook.updateAlbum({ name: albumNameRef.current.value }, data.id);
        if (updateHook.success) {
          toast.success("Successfully updated changes");
        }
        if (updateHook.error) {
          toast.error(updateHook.error);
        }
        setIsEditing(false);
      } else {
        setIsEditing(false);
      }
    }
  };

  const createFromSelection = () => {
    navigate("/create");
  };

  return (
    <PageContainer>
      {loading && <p>Loading...</p>}
      {data && (
        <div>
          <Toaster />
          <Heading className="mb-3">
            {isEditing ? (
              <form className="album-name-container" onSubmit={updateName}>
                <InputText
                  type="text"
                  placeholder="Enter new album name"
                  ref={albumNameRef}
                />
                <Button
                  className={`${updateHook.isLoading && "disabled"} ml-2`}
                  type="submit"
                >
                  Change
                </Button>
              </form>
            ) : (
              <>
                <Button
                  className={`${updateHook.isLoading && "disabled"} secondary`}
                  onClick={() => setDeleteQuestion(true)}
                >
                  Delete album
                </Button>
                <div className="album-name-container">
                  <h1>{data.name}</h1>
                  <div className="ml-2 fa-icon">
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => setIsEditing(true)}
                    />
                  </div>
                </div>
                <Button
                  className={`${updateHook.isLoading && "disabled"}`}
                  onClick={() => setShareQuestion(true)}
                >
                  Share album
                </Button>
              </>
            )}
          </Heading>
          <TextLink className="mb-2" align="left">
            <span className="text-link-span" onClick={createFromSelection}>
              Create new album based on selected images
            </span>
          </TextLink>
          <Dropzone />
          <ImageGrid
            images={images}
            removeImage={handleRemoveImage}
            isNewAlbum={false}
          />
        </div>
      )}
      {(deleteQuestion || lastImageDelete || shareQuestion) && (
        <PopQuestion
          albumDetails={data}
          type={
            lastImageDelete ? "lastImage" : deleteQuestion ? "delete" : "share"
          }
          setDeleteQuestion={setDeleteQuestion}
          setShareQuestion={setShareQuestion}
          setLastImageDelete={setLastImageDelete}
        />
      )}
    </PageContainer>
  );
};

export default AlbumPage;
