import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteAlbum } from "../hooks/useDeleteAlbum";
import { useDataContext } from "../contexts/DataContext";
import SuperButton from "../components/SuperButton";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const PopQuestion = ({
  albumDetails,
  type,
  setDeleteQuestion,
  setShareQuestion,
  setLastImageDelete,
}) => {
  const { setImages } = useDataContext();
  const deleteAlbumHook = useDeleteAlbum();
  const emailRef = useRef();
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();

  const handleDeleteAlbum = () => {
    setImages([]);
    if (type === "delete") {
      setDeleteQuestion(false)
    } else {
      setLastImageDelete(false)
    }
    deleteAlbumHook.deleteAlbum(albumDetails);
    navigate("/");
  };

  const handleShareAlbum = async () => {
    console.log("Shared album with: ", emailRef.current.value);

    try {
      const result = await addDoc(collection(db, "albums"), {
        name: `${albumDetails.name} - in review`,
        public: true,
        images: albumDetails.images,
        ownerId: albumDetails.ownerId,
        timestamp: serverTimestamp(),
      });
      navigate(`/customer-album/${result.id}`);
    } catch (e) {
      console.log(e);
      setError("Got following error when creating album: ", e.message);
    }
  };

  const hidePopQuestion = () => {
    if (type === "delete") {
      setDeleteQuestion(false)
    } else {
      setLastImageDelete(false)
    }
  }
  

  return (
    <div className="pop-container">
      {(type === "delete" || type === "lastImage") ? (
        <div className="delete-box py-3 px-4">
          {deleteAlbumHook.isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {deleteAlbumHook.error && (
                <p>
                  We were not able to delete the album, got following error:{" "}
                  {deleteAlbumHook.error}
                </p>
              )}
              <p>
                {type === "delete"
                  ? "Are you sure you want to delete the album?"
                  : "You are about to delete the last image in this album. An album must contain at least one image or it will be deleted. Do you wish to delete the album?"}
              </p>
              <SuperButton
                className="secondary mx-2"
                title="no"
                onClick={hidePopQuestion}
              />
              <SuperButton
                className="mx-2"
                title="yes"
                onClick={handleDeleteAlbum}
              />
            </>
          )}
        </div>
      ) : (
        <div className="share-box py-3 px-4">
          {error && <p>{error}</p>}
          <p>Do you wish to share the album?</p>
          <input
            className="mb-3"
            type="text"
            placeholder="Enter email"
            ref={emailRef}
          />
          <div>
            <SuperButton
              className="secondary mx-2"
              title="no"
              onClick={() => setShareQuestion(false)}
            />
            <SuperButton
              className="mx-2"
              title="Send"
              onClick={handleShareAlbum}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PopQuestion;
