import React, { useState } from "react";
import SuperButton from '../components/SuperButton'
import { useDataContext } from "../contexts/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


const CustomerImageCard = ({ image }) => {
    const { newImages, setNewImages } = useDataContext()
    const [vote, setVote] = useState(false) 
    const [keep, setKeep] = useState(undefined)
    const [remove, setRemove] = useState(undefined)

    const removeDuplicate = () => {
        return newImages.filter((newImage) => newImage.uuid !== image.uuid);
    }
    

    const handleKeep = () => {
        setKeep(true)
        setRemove(false)
        setVote(false)
        const freshData = removeDuplicate()
        setNewImages([...freshData, {...image, remove: false}])
    }

    const handleRemove = () => {
        setRemove(true)
        setKeep(false)
        setVote(false)
        const freshData = removeDuplicate()
        setNewImages([...freshData, {...image, remove: true}])
    }

    return (
        <div key={image.uuid} className={`image-card ${keep && "keep"} ${remove && "remove"}`} >
            <div className="review-btn">
                {!vote && <SuperButton className="small" title="Review" onClick={() => setVote(true)} />}
            </div>
            {vote && (
                <div className="vote-overlay">
                    <div className="vote-box">
                        <p>Do you want to keep the image?</p>
                        <div className="mt-3 btn-box">
                            <SuperButton className="m-1 secondary small" title="no" onClick={handleRemove} />
                            <SuperButton className="m-1 small" title="yes" onClick={handleKeep} />
                        </div>
                    </div>
                    <div className="fa-icon">
                        <FontAwesomeIcon icon={faTimes} color="white" onClick={() => setVote(false)}/>
                    </div>
                </div>
            )}
            <img src={image.url} alt={image.uuid} />
        </div>
    )
}

export default CustomerImageCard
