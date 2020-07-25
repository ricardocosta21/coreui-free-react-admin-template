import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import CardSection from './CardSection';

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  //1st // useEffect its onComponentDidLoad
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
       //.fetch("https://localhost:5001/api/create-payment-intent", {
      .fetch("http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
       //body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  //2nd
  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value
        }
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the result in your
        <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
          Stripe dashboard.
        </a> Refresh the page to pay again.
      </p>
    </form>
  );
}

// import React from 'react';
// import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';

// import CardSection from './CardSection';

// class CheckoutForm extends React.Component {
//   handleSubmit = async (event) => {
//     // We don't want to let default form submission happen here,
//     // which would refresh the page.
//     event.preventDefault();

//     const {stripe, elements} = this.props

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make  sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     const result = await stripe.confirmCardPayment('{CLIENT_SECRET}', {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: 'Jenny Rosen',
//         },
//       }
//     });

//     if (result.error) {
//       // Show error to your customer (e.g., insufficient funds)
//       console.log(result.error.message);
//     } else {
//       // The payment has been processed!
//       if (result.paymentIntent.status === 'succeeded') {
//         console.log("Success!!");
//         // Show a success message to your customer
//         // There's a risk of the customer closing the window before callback
//         // execution. Set up a webhook or plugin to listen for the
//         // payment_intent.succeeded event that handles any business critical
//         // post-payment actions.
//       }
//     }
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <CardSection />
//         <button disabled={!this.props.stripe}>Confirm order</button>
//       </form>
//     );
//   }
// }

// export default function InjectedCheckoutForm() {
//   return (
//     <ElementsConsumer>
//       {({stripe, elements}) => (
//         <CheckoutForm  stripe={stripe} elements={elements} />
//       )}
//     </ElementsConsumer>
//   );
// }
