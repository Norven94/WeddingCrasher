import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

export const useSnapshotCollection = () => {
  const { currentUser } = useAuthContext();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
      const queryRef = query(
        collection(db, "albums"),
        where("ownerId", "==", currentUser.uid)
      );

      const unsubscribe = onSnapshot(queryRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setData(data);
        setLoading(false);
      });

      return unsubscribe;
    }
  }, []);

  return {
    loading,
    data,
  };
};
