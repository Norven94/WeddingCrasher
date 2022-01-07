import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useSnapshotCollection } from "../hooks/useSnapshotCollection";
import SuperButton from "../components/SuperButton";

const HomePage = () => {
  const { currentUser } = useAuthContext();
  const { data, loading } = useSnapshotCollection();

  const navigate = useNavigate();

  return (
    <div className="pageContainer">
      {currentUser ? (
        <div>
          <SuperButton
            className="my-4 big"
            onClick={() => navigate("/create")}
            title="create album"
          />
          {loading && <p>Loading...</p>}
          {data && (
            <div className="albums-container">
              {data.map((album) => (
                <div key={album.id} className="album-card" onClick={() => navigate(`/album/${album.id}`)}>
                  {console.log(album)}
                  <h2>{album.name}</h2>
                  <p>{album.id}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>Login or create a new account for more features</p>
          <SuperButton onClick={() => navigate("/signup")} title="Signup" />
        </div>
      )}
    </div>
  );
};

export default HomePage;
