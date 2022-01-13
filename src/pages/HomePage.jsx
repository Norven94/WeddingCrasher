import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useSnapshotCollection } from "../hooks/useSnapshotCollection";
import { Button } from "../components/styled/Button";
import { PageContainer } from "../components/styled/PageContainer";
import { AlbumGrid } from "../components/styled/AlbumGrid";
import { AlbumCard } from "../components/styled/AlbumCard";

const HomePage = () => {
  const { currentUser } = useAuthContext();
  const { data, loading } = useSnapshotCollection();

  const navigate = useNavigate();

  return (
    <PageContainer>
      {currentUser ? (
        <div>
          <Button className="my-4 big" onClick={() => navigate("/create")}>
            Create album
          </Button>
          {loading && <p>Loading...</p>}
          {data && (
            <AlbumGrid>
              {data.map((album) => (
                <AlbumCard
                  key={album.id}
                  className="my-2"
                  onClick={() => navigate(`/album/${album.id}`)}
                >
                  <h2>{album.name}</h2>
                  <p>Created: {album.timestamp.toDate().toDateString()}</p>
                  <p>Images: {album.images.length}</p>
                </AlbumCard>
              ))}
            </AlbumGrid>
          )}
        </div>
      ) : (
        <div>
          <p>Login or create a new account for more features</p>
          <Button onClick={() => navigate("/signup")}>Signup</Button>
        </div>
      )}
    </PageContainer>
  );
};

export default HomePage;
