import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51H7KdVHWUwuAN6yQmtIC9Hg0o6Ott8QWOfcGDoA6taCr9MzUBsFicjG83R69fOcYW3bvC0KG3EMPDp45m67IDGm200zF2Q9Q6A");

function Stripe() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;
