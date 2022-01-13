import { useState } from "react";
import { useDeleteImage } from "./useDeleteImage";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export const useDeleteAlbum = () => {
  const { deleteImage } = useDeleteImage();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const deleteAlbum = async (album) => {
    setError(null);
    setIsLoading(true);

    try {
      await deleteDoc(doc(db, "albums", album.id));
      album.images.map((image) => {
        deleteImage(image);
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    deleteAlbum,
  };
};
