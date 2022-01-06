import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { CircleLoader } from 'react-spinners'

const AuthContext = createContext()

const useAuthContext = () => {
  return useContext(AuthContext);
}

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)  

  useEffect(() => {
      // listen for auth-state changes
      onAuthStateChanged(auth, (user) => {
          setCurrentUser(user)
          setIsLoading(false)
      })
  }, [])


  const values = {
    currentUser,
    setCurrentUser
  }

  return (
    <AuthContext.Provider value={values}>
      {isLoading && (
				<div id="spinner">
					<CircleLoader color={"#FF9B9B"} size={50} />
				</div>
			)}
			{!isLoading && children}
    </AuthContext.Provider>
  )
}

export { useAuthContext, AuthContextProvider as default }