import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";

const CheckoutForm = ({ bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success/${bookingId}`,
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      <button
        disabled={!stripe || loading}
        className="w-full py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold transition disabled:opacity-60"
      >
        {loading ? "Processing…" : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
