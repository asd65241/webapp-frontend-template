import React from "react";
import ReactDOM from "react-dom/client";
import "./css/style.scss";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { ModalProvider } from "./context/ModalProvider";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
