import React, { useState } from "react";
import { Button } from "../components/styled/Button";
import { ImageCard } from "../components/styled/ImageCard";
import { useDataContext } from "../contexts/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CustomerImageCard = ({ image }) => {
  const { newImages, setNewImages } = useDataContext();
  const [vote, setVote] = useState(false);
  const [keep, setKeep] = useState(undefined);
  const [remove, setRemove] = useState(undefined);

  const removeDuplicate = () => {
    return newImages.filter((newImage) => newImage.uuid !== image.uuid);
  };

  const handleKeep = () => {
    setKeep(true);
    setRemove(false);
    setVote(false);
    const freshData = removeDuplicate();
    setNewImages([...freshData, { ...image, remove: false }]);
  };

  const handleRemove = () => {
    setRemove(true);
    setKeep(false);
    setVote(false);
    const freshData = removeDuplicate();
    setNewImages([...freshData, { ...image, remove: true }]);
  };

  return (
    <ImageCard
      key={image.uuid}
      className={`${keep && "keep"} ${remove && "remove"}`}
    >
      <div className="review-btn">
        {!vote && (
          <Button className="small" onClick={() => setVote(true)}>
            Review
          </Button>
        )}
      </div>
      {vote && (
        <div className="vote-overlay">
          <div className="vote-box">
            <p>Do you want to keep the image?</p>
            <div className="mt-3 btn-box">
              <Button className="m-1 secondary small" onClick={handleRemove}>
                no
              </Button>
              <Button className="m-1 small" onClick={handleKeep}>
                yes
              </Button>
            </div>
          </div>
          <div className="fa-icon">
            <FontAwesomeIcon
              icon={faTimes}
              color="white"
              onClick={() => setVote(false)}
            />
          </div>
        </div>
      )}
      <img src={image.url} alt={image.uuid} />
    </ImageCard>
  );
};

export default CustomerImageCard;
