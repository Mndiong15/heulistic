import React, { useState, useEffect } from "react";
import Stripe from '@stripe/react-stripe-js';

var STRIPE_PUBLISHABLE_KEY_TEST = 'pk_test_51N1APUASZB5G51LqlRpNSm745a9l7ltCN67KjbmNuxtO9NCQNOgyvmT7wH5Kn9g5aeBPfEh1voZhvv5wJmidyFZW000CBSsgTv'
const stripe = new Stripe(STRIPE_PUBLISHABLE_KEY_TEST);

const SubscriptionForm = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const plansResponse = await fetch("/api/stripe/plans/");
    const plansData = await plansResponse.json();
    setPlans(plansData);
  };

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/stripe/subscribe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan: selectedPlan,
      }),
    });
    const responseData = await response.json();
    window.location.href = responseData.redirect_url;
  };

  return (
    <form onSubmit={handleSubmit}>
      {plans.map((plan) => (
        <div key={plan.id}>
          <label>
            <input
              type="radio"
              value={plan.id}
              checked={selectedPlan === plan.id}
              onChange={handlePlanChange}
            />
            {plan.nickname} (${(plan.amount / 100).toFixed(2)} per {plan.interval})
          </label>
        </div>
      ))}
      <button type="submit">Subscribe</button>
    </form>
  );
};

export default SubscriptionForm;
