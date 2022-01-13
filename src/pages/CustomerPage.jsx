import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnapshotDocument } from "../hooks/useSnapshotDocument";
import { useUpdateAlbum } from '../hooks/useUpdateAlbum'
import { useDeleteImage } from "../hooks/useDeleteImage";
import { useDataContext } from "../contexts/DataContext";
import ImageGrid from "../components/ImageGrid";
import {Button} from "../components/styled/Button";
import {PageContainer} from "../components/styled/PageContainer"
import { Heading } from "../components/styled/Heading";
import { TotalContainer } from "../components/styled/TotalContainer";
import PopQuestion from "../components/PopQuestion";
import toast, { Toaster } from "react-hot-toast";

const CustomerPage = () => {
  const { id } = useParams();
  const { data, loading } = useSnapshotDocument(id);
  const updateAlbumHook = useUpdateAlbum()
  const deleteImageHook = useDeleteImage()
  const { images, setImages, newImages } = useDataContext();
  const [lastImageDelete, setLastImageDelete] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setImages(data.images);
    }
  }, [data]);

  const handleSave = async () => {
    if (images.length - newImages.length) {
      toast.error("Not all images reviewed");
    } else {
      
      const imagesToKeep = newImages.filter((image) => {
        if (!image.remove) {
          delete image.remove;
          return image;
        } else {
          delete image.remove;
          deleteImageHook.deleteImage(image)
        }
      });
      //If no image remains in album, ask to delete hole album instead
      if (imagesToKeep.length < 1) {
        setLastImageDelete(true)
      } else {
        if (!updateAlbumHook.isLoading) {
          const timeStamp = new Date().toLocaleDateString("en-GB");
          const newName = data.name.match(/^(.*)\s\-\sin\sreview/)
          
          updateAlbumHook.updateAlbum({
            name: `${newName[1]} - ${timeStamp}`,
            public: false,
            images: imagesToKeep
          }, data.id)
  
          navigate("/");
        }
      }
    }
  };

  return (
    <PageContainer>
      {loading && <p>Loading...</p>}
      {data && (
        <>
          {data.public ? (
            <div className="customer-container">
              <Toaster />
              <Heading>
                <h1>{data.name}</h1>
                <Button
                  className="ml-3"
                  onClick={handleSave}
                >Save</Button>
              </Heading>
              <TotalContainer>
                <span className="total-big">
                  Total images{" "}
                  {newImages.filter((image) => !image.remove).length}
                </span>
                <span className="ml-1 total-small">
                  ({newImages.filter((image) => image.remove).length} removed
                  {images.length - newImages.length
                    ? `, ${images.length - newImages.length} not reviewed`
                    : ""}
                  )
                </span>
              </TotalContainer>
              <ImageGrid images={images} />
            </div>
          ) : (
            <p>This album is not public</p>
          )}
        </>
      )}
      {lastImageDelete && (
        <PopQuestion albumDetails={data} type="lastImage" setLastImageDelete={setLastImageDelete}/>
      )}
    </PageContainer>
  );
};

export default CustomerPage;
