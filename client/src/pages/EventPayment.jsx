import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../lib/stripe";
import api from "../api/axios";
import EventCheckoutForm from "./EventCheckoutForm";

const EventPayment = () => {
  const { bookingId } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.post("/events/payments/create-intent", { bookingId });
        setClientSecret(res.data.clientSecret);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Initializing secure payment…
      </div>
    );
  }

  if (!clientSecret) return null;

  const options = {
    clientSecret,
    appearance: {
      theme: "night",
      variables: {
        colorPrimary: "#f59e0b", // amber
        colorBackground: "#0b0b0b",
        colorText: "#ffffff",
        colorDanger: "#ef4444",
        fontFamily: "Inter, system-ui, sans-serif",
        borderRadius: "14px",
        spacingUnit: "6px",
      },
      rules: {
        ".Input": {
          backgroundColor: "#111",
          border: "1px solid #222",
        },
        ".Input:focus": {
          borderColor: "#f59e0b",
        },
        ".Label": {
          color: "#bbb",
        },
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070707] px-4">
      <div className="w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-3xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Complete Payment
        </h1>

        <p className="text-sm text-white/60 mb-6">
          Secure checkout powered by Stripe
        </p>

        <Elements stripe={stripePromise} options={options}>
          <EventCheckoutForm bookingId={bookingId} />
        </Elements>

        <p className="mt-6 text-xs text-white/40 text-center">
          🔒 Your payment is encrypted and secure
        </p>
      </div>
    </div>
  );
};

export default EventPayment;
