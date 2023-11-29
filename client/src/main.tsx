import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import "@/assets/css/index.css"
import { ThemeProvider } from "@/assets/theme";

import App from "./routes";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"),
);
