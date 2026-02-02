import "./index.css";
import { createRoot } from "react-dom/client";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import Router from './router/Router'

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <Router/>
    </ThemeContextProvider>
  </AuthContextProvider>,
);
