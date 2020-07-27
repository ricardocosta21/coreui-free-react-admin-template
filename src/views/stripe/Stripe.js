import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { connect } from "react-redux";
import { compose } from "redux";

import CheckoutForm from "./CheckoutForm";
import { Redirect } from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51H7KdVHWUwuAN6yQmtIC9Hg0o6Ott8QWOfcGDoA6taCr9MzUBsFicjG83R69fOcYW3bvC0KG3EMPDp45m67IDGm200zF2Q9Q6A"
);

function Stripe(props) {
  const { auth } = props;

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default compose(connect(mapStateToProps))(Stripe);
