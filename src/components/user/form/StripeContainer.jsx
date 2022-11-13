import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_KEY_API);

const StripeContainer = () => {
    return (
        <Elements stripe={stripePromise}>

        </Elements>
    )
}

export default StripeContainer
