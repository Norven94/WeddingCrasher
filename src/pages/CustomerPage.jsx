import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSnapshotDocument } from "../hooks/useSnapshotDocument";
import { useDataContext } from "../contexts/DataContext";
import ImageGrid from "../components/ImageGrid";

const CustomerPage = () => {
  const { id } = useParams();
  const { data, loading } = useSnapshotDocument(id);
  const { images, setImages } = useDataContext();

  useEffect(() => {
    if (data) {
      setImages(data.images);
    }
  }, [data]);

  return (
    <div className="pageContainer">
      {loading && <p>Loading...</p>}
      {data && (
        <div>
          <h1>{data.name}</h1>
          <ImageGrid images={images} />
        </div>
      )}
    </div>
  );
};

export default CustomerPage;
