import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnapshotDocument } from "../hooks/useSnapshotDocument";
import { useUpdateAlbum } from '../hooks/useUpdateAlbum'
import { useDataContext } from "../contexts/DataContext";
import ImageGrid from "../components/ImageGrid";
import SuperButton from "../components/SuperButton";
import toast, { Toaster } from "react-hot-toast";

const CustomerPage = () => {
  const { id } = useParams();
  const { data, loading } = useSnapshotDocument(id);
  const updateAlbumHook = useUpdateAlbum()
  const { images, setImages, newImages } = useDataContext();
  const [error, setError] = useState(undefined);

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
        }
      });

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
  };

  return (
    <div className="pageContainer">
      {loading && <p>Loading...</p>}
      {data && (
        <>
          {data.public ? (
            <div className="customer-container">
              <Toaster />
              <div className="my-2 heading-container">
                <h1>{data.name}</h1>
                <SuperButton
                  className="ml-3"
                  title="Save"
                  onClick={handleSave}
                />
              </div>
              <div className="mb-2 total-container">
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
              </div>
              <ImageGrid images={images} />
            </div>
          ) : (
            <p>This album is not public</p>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerPage;
