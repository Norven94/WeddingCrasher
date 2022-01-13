import React, { useState } from 'react'
import { useDataContext } from "../contexts/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { ImageCard } from '../components/styled/ImageCard'

const PhotographImageCard = ({ image, removeImage, isNewAlbum }) => {
    const { selectedImages, setSelectedImages } = useDataContext()
    const [isSelected, setisSelected] = useState(false)

    const handleImageSelect = () => {
        if (selectedImages.find(i => i.uuid === image.uuid)) {
            //If image is already selected 
            setSelectedImages(selectedImages => selectedImages.filter(i => i.uuid !== image.uuid))
            setisSelected(false)
        } else {
            //If image is not selected already
            setSelectedImages([...selectedImages, image])
            setisSelected(true)
        }
    }


    return (
        <ImageCard >
            <img src={image.url} alt={image.uuid} />
            <div className="fa-icon">
                <FontAwesomeIcon
                    icon={faTrashAlt}
                    size="2x"
                    onClick={() => removeImage(image)}
                />
            </div>
            {!isNewAlbum && (
                <div className="select-btn">
                    <input type="checkbox" checked={isSelected ? true : false} onChange={handleImageSelect} />
                </div>
            )}
        </ImageCard>
    )
}

export default PhotographImageCard
