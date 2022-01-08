import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteAlbum } from "../hooks/useDeleteAlbum";
import { useDataContext } from "../contexts/DataContext";
import { useAuthContext } from "../contexts/AuthContext";
import SuperButton from "../components/SuperButton";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const PopQuestion = ({
  albumDetails,
  type,
  setDeleteQuestion,
  setShareQuestion,
}) => {
  const { images, setImages } = useDataContext();
  const { currentUser } = useAuthContext();
  const deleteAlbumHook = useDeleteAlbum();
  const emailRef = useRef();
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();

  const handleDeleteAlbum = () => {
    setImages([]);
    setDeleteQuestion(false);
    deleteAlbumHook.deleteAlbum(albumDetails.id);
    navigate("/");
  };

  const handleShareAlbum = async () => {
    console.log("Shared album with: ", emailRef.current.value);

    try {
      const timeStamp = new Date().toLocaleDateString("en-GB");
      const result = await addDoc(collection(db, "albums"), {
        name: `${albumDetails.name} - ${timeStamp}`,
        public: true,
        images,
        ownerId: currentUser.uid,
      });
      setShareQuestion(false);
      navigate(`/customer-album/${result.id}`);
    } catch (e) {
      console.log(e);
      setError("Got following error when sharing album: ", e.message);
    }
  };

  return (
    <div className="pop-container">
      {type === "delete" ? (
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
              <p>Are you sure you want to delete the album?</p>
              <SuperButton
                className="secondary mx-2"
                title="no"
                onClick={() => setDeleteQuestion(false)}
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
