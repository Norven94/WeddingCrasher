import React from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/sass/App.scss";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CustomerPage from "./pages/CustomerPage";
import HomePage from "./pages/HomePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AlbumPage from "./pages/AlbumPage";
import CreateAlbumPage from "./pages/CreateAlbumPage";
import SecureRoute from './components/SecureRoute'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/customer-album" element={<CustomerPage />} />
        <Route path="/reset" element={<ResetPasswordPage />} />
        <Route path="/" element={<HomePage />} />

        {/* Secure routes */}
        <Route path="/album" element={
          <SecureRoute redirectTo="/login">
            <AlbumPage />
          </SecureRoute>
        } />

        <Route path="/create" element={
          <SecureRoute redirectTo="/login">
            <CreateAlbumPage />
          </SecureRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
