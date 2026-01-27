import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./lib/stripe";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#111",
              color: "#fff",
            },
          }}
        />
        <App />
      </Elements>
    </AuthProvider>
  </StrictMode>,
)
