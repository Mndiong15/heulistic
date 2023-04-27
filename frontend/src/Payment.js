import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      setPaymentSuccess(paymentMethod.id);
      setPaymentError(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Card details
          <CardElement />
        </label>
        <button type="submit">Pay</button>
      </form>
      {paymentError && <p>{paymentError}</p>}
      {paymentSuccess && <p>Payment successful: {paymentSuccess}</p>}
    </div>
  );
};

export default PaymentForm;
