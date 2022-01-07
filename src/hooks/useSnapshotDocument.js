import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const useSnapshotDocument = (albumId) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, "albums", albumId)

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (!snapshot.exists()) {
				setData(false)
				setLoading(false)
				return
			}

			setData({id: snapshot.id, ...snapshot.data()})
			setLoading(false)
    });

    return unsubscribe;
  }, [albumId]);

  return {
    loading,
    data,
  };
};
