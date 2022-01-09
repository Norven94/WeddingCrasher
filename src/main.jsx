import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./assets/sass/index.scss";
import App from "./App";
import SimpleReactLightbox from 'simple-react-lightbox'
import AuthContextProvider from './contexts/AuthContext'
import DataContextProvider from './contexts/DataContext'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DataContextProvider>
          <SimpleReactLightbox>
            <App />
          </SimpleReactLightbox>
        </DataContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
