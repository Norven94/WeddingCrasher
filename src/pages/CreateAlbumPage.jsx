import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/styled/Button";
import { InputText } from "../components/styled/InputText";
import { PageContainer } from "../components/styled/PageContainer";
import { Form } from "../components/styled/Form";
import Dropzone from "../components/Dropzone";
import ImageGrid from "../components/ImageGrid";

import { useAuthContext } from "../contexts/AuthContext";
import { useDataContext } from "../contexts/DataContext";
import { useDeleteImage } from "../hooks/useDeleteImage";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const CreateAlbumPage = () => {
  const { currentUser } = useAuthContext();
  const { images, setImages, imageUploadComplete, selectedImages } =
    useDataContext();
  const [error, setError] = useState(null);
  const useDelete = useDeleteImage();
  const nameRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedImages) {
      setImages(selectedImages);
    } else {
      setImages([]);
    }
  }, [selectedImages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // make sure the user added at least one image and a album name before trying to create the album
    if (!images.length) {
      setError("You need to add at least one image");
    } else if (nameRef.current.value === "") {
      setError("You need to add a album name");
    } else {
      // try to create album with the uploaded images
      try {
        await addDoc(collection(db, "albums"), {
          name: nameRef.current.value,
          public: false,
          images,
          ownerId: currentUser.uid,
          timestamp: serverTimestamp(),
        });
        setImages([]);
        navigate("/");
      } catch (e) {
        setError("Got following error when creating album: ", e.message);
      }
    }
  };

  const handleRemoveImage = (params) => {
    useDelete.deleteImage(params);
    setImages((images) => images.filter((image) => image.uuid !== params.uuid));
  };

  return (
    <PageContainer>
      <h1>Create album page</h1>
      <Form onSubmit={handleSubmit}>
        <InputText
          className="mt-2"
          type="text"
          placeholder="Enter album name"
          ref={nameRef}
        />
        <Button
          className={`my-2 ${imageUploadComplete && "disabled"} mx-2`}
          type="submit"
        >
          create
        </Button>
      </Form>
      {error && <p>{error}</p>}
      <Dropzone />

      <ImageGrid
        images={images}
        removeImage={handleRemoveImage}
        isNewAlbum={true}
      />
    </PageContainer>
  );
};

export default CreateAlbumPage;
