import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import "@/assets/css/global.css"
import { ThemeProvider } from "@/assets/theme/theme-provider";


import App from "./routes";

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
