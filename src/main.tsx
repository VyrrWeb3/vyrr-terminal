import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";

// Solana wallet adapter often requires Buffer in the browser environment
import { Buffer } from 'buffer';
window.Buffer = window.Buffer || Buffer;

// Import Solana wallet styles globally to ensure the modal renders correctly
import '@solana/wallet-adapter-react-ui/styles.css';

createRoot(document.getElementById("root")!).render(<App />);