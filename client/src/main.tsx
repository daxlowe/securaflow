import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@/assets/css/global.css";
import { ThemeProvider } from "@/assets/theme/theme-provider";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import App from "./routes";

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </ThemeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
