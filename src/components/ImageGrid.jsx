import React from "react";
import CustomerImageCard from '../components/CustomerImageCard';
import PhotographImageCard from '../components/PhotographImageCard';

import Masonry from 'react-masonry-css'
import { SRLWrapper } from 'simple-react-lightbox'

const masonryBreakpoints = {
	default: 3,
	576: 2,
	992: 3,
}

const ImageGrid = ({ images, removeImage, isNewAlbum }) => {

  return (
    <SRLWrapper>
        <Masonry
        breakpointCols={masonryBreakpoints}
        className="masonry-container"
        columnClassName="masonry-column"
        >
        {images.map((image) => (
            <div key={image.uuid}>
                {removeImage ? (
                    <PhotographImageCard image={image} removeImage={removeImage} isNewAlbum={isNewAlbum} />
                    
                ) : (
                    <CustomerImageCard image={image} />
                )}
            </div>
        ))}
        </Masonry>
    </SRLWrapper>
  );
};

export default ImageGrid;
