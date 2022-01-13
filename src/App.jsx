import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from './assets/theme'
import GlobalStyles from './components/styled/Global';
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
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/customer-album/:id" element={<CustomerPage />} />
          <Route path="/reset" element={<ResetPasswordPage />} />
          <Route path="/" element={<HomePage />} />

          {/* Secure routes */}
          <Route path="/album/:id" element={
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
      </ThemeProvider>
    </div>
    
  );
}

export default App;
