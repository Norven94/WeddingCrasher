import React from "react";
//import { SRLWrapper } from 'simple-react-lightbox'
import Masonry from 'react-masonry-css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const masonryBreakpoints = {
	default: 3,
	576: 2,
	992: 3,
}

const ImageGrid = ({ images, removeImage }) => {
  return (
    <Masonry
    breakpointCols={masonryBreakpoints}
    className="masonry-container"
    columnClassName="masonry-column"
    >
    {images.map((image) => (
        <div key={image.uuid} className="image-card">
            <img src={image.url} alt={image.uuid} />
            {removeImage && (
                <div className="fa-icon">
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => removeImage(image)}
                    />
                </div>
            )}
        </div>
    ))}
    </Masonry>
  );
};

export default ImageGrid;

/*
<SRLWrapper>
    <Masonry
    breakpointCols={masonryBreakpoints}
    className="memes-masonry"
    columnClassName="memes-masonry-column"
    >
    {images.map((image) => (
        <div key={image.uuid} className="image-card">
        <div>
            <img src={image.url} alt={image.uuid} />
            {removeImage && (
            <FontAwesomeIcon
                icon={faTrashAlt}
                onClick={() => removeImage(image)}
            />
            )}
        </div>
        </div>
    ))}
    </Masonry>
</SRLWrapper>
*/