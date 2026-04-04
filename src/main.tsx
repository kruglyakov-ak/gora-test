import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ChatPage } from "@/pages";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChatPage />
  </StrictMode>
);
