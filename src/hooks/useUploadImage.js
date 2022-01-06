import { useState } from 'react'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { storage } from "../firebase";

export const useUploadImage = () => {
    const [uploadProgress, setUploadProgress] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState(null)
    const [imageDetails, setImageDetails] = useState(null)

    const upload = async (image, userId) => {
        setIsLoading(true)
        setIsSuccess(false)
        setError(null)
        setImageDetails(null)
        
        const uuid = uuidv4()
        const ext = image.name.substring(image.name.lastIndexOf('.') + 1)
        const fileRef = ref(storage, `${userId}/${uuid}.${ext}`)
        const uploadTask = uploadBytesResumable(fileRef, image)

        uploadTask.on('state_changed', (uploadTaskSnapshot) => {
			setUploadProgress(Math.round((uploadTaskSnapshot.bytesTransferred / uploadTaskSnapshot.totalBytes) * 100))

		}, (e) => {
			setError(`Image failed to upload due to the following error: ${e.message}`)
            setIsLoading(false)
		}, async () => {
			// get download url to uploaded file
			const url = await getDownloadURL(fileRef)

            setImageDetails({
                url,
                path: fileRef.fullPath,
                uuid,
            })
            setIsLoading(false)
            setIsSuccess(true)
            setUploadProgress(null)
        })
    }

    return {
        upload,
        isLoading,
        isSuccess,
        error,
        uploadProgress,
        imageDetails
    }
}
