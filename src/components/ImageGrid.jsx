import React from "react";
import Masonry from 'react-masonry-css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { SRLWrapper } from 'simple-react-lightbox'

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import CustomerImageCard from '../components/CustomerImageCard';

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
        <div key={image.uuid}>
            {removeImage ? (
                <div className="image-card">
                    <img src={image.url} alt={image.uuid} />
                    <div className="fa-icon">
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            onClick={() => removeImage(image)}
                        />
                    </div>
                </div>
            ) : (
                <CustomerImageCard image={image} />
            )}
        </div>
    ))}
    </Masonry>
  );
};

export default ImageGrid;
