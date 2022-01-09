import React, { useState } from 'react'
import { useDataContext } from "../contexts/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import SuperButton from './SuperButton';

const PhotographImageCard = ({ image, removeImage }) => {
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
        <div className="image-card" >
            <img src={image.url} alt={image.uuid} />
            <div className="fa-icon">
                <FontAwesomeIcon
                    icon={faTrashAlt}
                    size="2x"
                    onClick={() => removeImage(image)}
                />
            </div>
            <div className="select-btn">
                <input type="checkbox" checked={isSelected ? true : false} onClick={handleImageSelect} />
            </div>
        </div>
    )
}

export default PhotographImageCard
