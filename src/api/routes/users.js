import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const createUser = async (email, password) => {
  /* Start creating the user in auth and a user in the users collection.
    If either the auth creation or document creation fails a error will be returned */
  const result = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      //If the credentials provided is okey then start creating the user in the users collection
      const result = await addDoc(collection(db, "users"), {
        email: user.email,
        userId: user.uid,
      })
        .then(() => {
          return user;
        })
        .catch((error) => {
          return error.message;
        });

      return result;
    })
    .catch((error) => {
      return error.message;
    });

  return result;
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};

export const resetPw = (email) => {
  return sendPasswordResetEmail(auth, email);
};
