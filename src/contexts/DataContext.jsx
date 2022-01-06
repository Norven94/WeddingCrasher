import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext()

const useDataContext = () => {
  return useContext(DataContext);
}

const DataContextProvider = ({ children }) => {
  const [images, setImages] = useState([])

  const values = {
    images,
    setImages,
  }

  return (
    <DataContext.Provider value={values}>
      {children}
    </DataContext.Provider>
  )
}

export { useDataContext, DataContextProvider as default }


