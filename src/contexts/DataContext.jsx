import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext()

const useDataContext = () => {
  return useContext(DataContext);
}

const DataContextProvider = ({ children }) => {
  const [images, setImages] = useState([])
  const [imageUploadComplete, setImageUploadComplete] = useState(true)
  const values = {
    images,
    setImages,
    imageUploadComplete,
    setImageUploadComplete
  }

  return (
    <DataContext.Provider value={values}>
      {children}
    </DataContext.Provider>
  )
}

export { useDataContext, DataContextProvider as default }


