import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext()

const useDataContext = () => {
  return useContext(DataContext);
}

const DataContextProvider = ({ children }) => {
  const [images, setImages] = useState([])
  const [newImages, setNewImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [imageUploadComplete, setImageUploadComplete] = useState(true)
  const values = {
    images,
    setImages,
    imageUploadComplete,
    setImageUploadComplete,
    newImages,
    setNewImages,
    selectedImages,
    setSelectedImages
  }

  return (
    <DataContext.Provider value={values}>
      {children}
    </DataContext.Provider>
  )
}

export { useDataContext, DataContextProvider as default }


