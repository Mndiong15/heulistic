import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PlanSelectionForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [processing, setProcessing] = useState(false);
  
  // test stripe plan ids
  const STRIPE_PLAN_ID_PRO_TEST = 'price_1N1MhLASZB5G51LqZuiINuyO';
  const STRIPE_PLAN_ID_INDIE_TEST = 'price_1N1MhcASZB5G51LqBurWRZ13';
  const STRIPE_PLAN_ID_BUSINESS_TEST = 'price_1N1dn0ASZB5G51LqKxFmVCX3';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      console.log(error);
      setProcessing(false);
      return;
    }
    const { id } = paymentMethod;
    // send payment method id and selected plan to backend for subscription creation
    console.log(id, selectedPlan);
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="radio"
          id="pro"
          name="plan"
          value="price_1N1MhLASZB5G51LqZuiINuyO"
          checked={selectedPlan === STRIPE_PLAN_ID_PRO_TEST}
          onChange={(e) => setSelectedPlan(e.target.value)}
        />
        <label htmlFor="pro">Pro</label>
      </div>
      <div>
        <input
          type="radio"
          id="indie"
          name="plan"
          value="prod_NnEFDqZBqSDwNf"
          checked={selectedPlan === STRIPE_PLAN_ID_INDIE_TEST}
          onChange={(e) => setSelectedPlan(e.target.value)}
        />
        <label htmlFor="indie">Indie</label>
      </div>
      <div>
        <input
          type="radio"
          id="business"
          name="plan"
          value="price_1N1MhcASZB5G51LqBurWRZ13"
          checked={selectedPlan === STRIPE_PLAN_ID_BUSINESS_TEST}
          onChange={(e) => setSelectedPlan(e.target.value)}
        />
        <label htmlFor="business">Business</label>
      </div>
      <div>
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe || processing}>
        Subscribe
      </button>
    </form>
  );
};

export default PlanSelectionForm;