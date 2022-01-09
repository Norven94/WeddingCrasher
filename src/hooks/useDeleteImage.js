import { useState } from "react";
import {
  doc,
  deleteDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";

export const useDeleteImage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const deleteImage = async (image) => {
    setError(null);
    setIsLoading(true);

    try {
      const queryRef = query(
        collection(db, "albums"),
        where("images", "array-contains", image)
      );
      const snapshot = await getDocs(queryRef);
      if (snapshot.docs.length < 1) {
		//If there are no copies of the image left in the albums then delete the image doc and remove it from storage
		const storageRef = ref(storage, image.path);
		await deleteObject(storageRef);
		await deleteDoc(doc(db, "images", image.imageReference));
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    deleteImage,
  };
};
