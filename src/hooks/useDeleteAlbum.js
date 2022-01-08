import { useState } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const useDeleteAlbum = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(null)

	const deleteAlbum = async (albumId) => {
		setError(null)
		setIsLoading(true)

		try {
            await deleteDoc(doc(db, 'albums', albumId))

		} catch (e) {
			setError(e.message)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		error,
		isLoading,
		deleteAlbum,
	}
}
