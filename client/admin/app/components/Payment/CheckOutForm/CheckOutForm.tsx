import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { styles } from "@/app/styles/style";
import Loader from "../../Loader/Loader";
import axios from "axios";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  user: any;
  refetch: () => void;
};

const CheckOutForm = ({ setOpen, data, user, refetch }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    try {
      // Create payment method
      const { paymentMethod, error: paymentError } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement!,
        });

      if (paymentError) {
        setError(paymentError.message || "An error occurred during payment.");
        setLoading(false);
        return;
      }

      // Confirm payment
      const response = await axios.post("/api/payment/confirm", {
        paymentMethodId: paymentMethod?.id,
        amount: data.price * 100, // amount in cents
        courseId: data._id,
        userId: user?._id,
      });

      if (response.data.success) {
        setSuccess(true);
        refetch(); // Refresh user data to include purchased course
      } else {
        setError(response.data.message || "Payment failed.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {success ? (
        <div className="text-center">
          <h2 className="text-[24px] font-Poppins font-[600] text-green-600">
            Payment Successful!
          </h2>
          <p className="text-[18px] mt-4">
            You have successfully enrolled in the course.
          </p>
          <button
            className={`${styles.button} mt-5`}
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-[22px] font-Poppins font-[600] text-center">
            Complete Your Payment
          </h2>
          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="w-full border rounded p-3">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": { color: "#aab7c4" },
                    },
                    invalid: { color: "#9e2146" },
                  },
                }}
              />
            </div>
            {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
            <button
              type="submit"
              className={`${styles.button} mt-5`}
              disabled={!stripe || loading}
            >
              {loading ? <Loader /> : `Pay $${data.price}`}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CheckOutForm;
