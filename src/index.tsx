import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from 'react-dom/client';

const app_container = document.getElementById('root');

const root = createRoot(app_container);
root.render(<App />);
