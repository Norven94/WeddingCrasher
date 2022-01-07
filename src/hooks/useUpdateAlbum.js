import { useState } from 'react'
import { updateDoc, doc} from "firebase/firestore"
import { db } from "../firebase"

export const useUpdateAlbum = () => {
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    
    const updateAlbum = (params, albumId) => {
        console.log({params, albumId})
        setSuccess(false)
        setError(false)
        setisLoading(true)

        const docRef = doc(db, "albums", albumId)
    
        updateDoc(docRef, params)
            .then(() => {
                setSuccess(true)
                setisLoading(false)
            })
            .catch(e => {
                setError(e.message)
                setisLoading(false)
            })
    }

    return {
        isLoading,
        error,
        success,
        updateAlbum
    }
}
