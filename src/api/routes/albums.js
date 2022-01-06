import { collection, addDoc, query, where, getDocs } from "firebase/firestore"
import { ref, deleteObject } from "@firebase/storage"
import { db, storage } from "../../firebase"

export const createAlbum = (params, userId) => {
    console.log(params)
    
    return addDoc(collection(db, 'albums'), {
        name: params.name,
        public: false,
        images: params.images,
        ownerId: userId
    })
}

export const updateAlbum = () => {

}

export const deleteAlbum = (id) => {
    
}

export const deleteImage = (imagePath) => {
    const storageRef = ref(storage, imagePath)
    deleteObject(storageRef)
}
