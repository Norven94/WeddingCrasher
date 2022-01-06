import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import SuperButton from "../components/SuperButton";
import Dropzone from "../components/Dropzone";
import ImageGrid from '../components/ImageGrid'
import { useAuthContext } from "../contexts/AuthContext";
import { useDataContext } from "../contexts/DataContext";
import { createAlbum, deleteImage } from "../api/routes/albums";

const CreateAlbumPage = () => {
  const { currentUser } = useAuthContext();
  const { images, setImages } = useDataContext();
  const nameRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // make sure the user added at least one image and a album name before trying to create the album
    console.log(images);
    if (!images.length) {
      console.log("You need to add at least one image");
    } else if (nameRef.current.value === "") {
      console.log("You need to add a album name");
    } else {
      const values = {
        name: nameRef.current.value,
        images,
      };

      // try to create album with the uploaded images
      try {
        await createAlbum(values, currentUser.uid);
        setImages([]);
        navigate("/");
      } catch (e) {
        console.log("Got following error when creating album: ", e.message);
      }
    }
  };

  const handleRemoveImage = (params) => {
    deleteImage(params.path)
    setImages(images => images.filter(image => image.uuid !== params.uuid))
  } 

  return (
    <div className="pageContainer">
      <h1>Create album page</h1>
      <form onSubmit={handleSubmit} className="album-form-container">
        <input className="mx-2" type="text" placeholder="Enter album name" ref={nameRef} />
        <SuperButton className="mx-2" title="create" type="submit" />
      </form>
      <Dropzone />
      
      <ImageGrid images={images} removeImage={handleRemoveImage} />
    </div>
  );
};

export default CreateAlbumPage;
