

import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducer";
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <Provider store={store}>
      <HashRouter>
        <App />
        <Toaster />
      </HashRouter>
    </Provider>
    </StrictMode>
);
