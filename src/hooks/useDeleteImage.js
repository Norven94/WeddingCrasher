import { useState } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase'

export const useDeleteImage = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(null)

	const deleteImage = async (image) => {
		setError(null)
		setIsLoading(true)

		try {
            const storageRef = ref(storage, image.path)
            await deleteObject(storageRef)

			console.log(image)
            await deleteDoc(doc(db, 'images', image._id))

		} catch (e) {
			setError(e.message)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		error,
		isLoading,
		deleteImage,
	}
}
