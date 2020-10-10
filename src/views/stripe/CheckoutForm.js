import React, { Component } from "react";
import { CardElement } from "@stripe/react-stripe-js";

import { connect } from "react-redux";

import { CButton } from "@coreui/react";

import CardSection from "./CardSection";

import { handleGetBasketProductsForUser } from "../../actions/apiActions";

// const apiConnection = process.env.REACT_APP_ECS_ENDPOINT_LOCAL;

const apiConnection = process.env.REACT_APP_ECS_ENDPOINT;

//ecs
//const apiConnection = "http://ec2-18-191-181-130.us-east-2.compute.amazonaws.com:8888/api/"

export class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "",
      succeeded: false,
      error: null,
      processing: "",
      disabled: true,
      clientSecret: "",
    };

    // const [succeeded, setSucceeded] = useState(false);
    // const [error, setError] = useState(null);
    // const [processing, setProcessing] = useState("");
    // const [disabled, setDisabled] = useState(true);
    // const [clientSecret, setClientSecret] = useState("");
  }

  handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    // setDisabled(event.empty);
    this.setState({ disabled: event.empty });

    // setError(event.error ? event.error.message : "");
    this.setState({ error: event.error ? event.error.message : "" });
  };

  //2nd
  handleSubmit = async (ev) => {
    ev.preventDefault();

    // const stripe = useStripe();
    // const elements = useElements();
    // var elements = this.props.stripe.elements();

    // setProcessing(true);
    this.setState({ processing: true });
    const payload = await this.props.stripe.confirmCardPayment(
      this.state.clientSecret,
      {
        payment_method: {
          card: this.props.elements.getElement(CardElement),
          billing_details: {
            name: ev.target.name.value,
          },
        },
      }
    );
    if (payload.error) {
      // setError(`Payment failed ${payload.error.message}`);
      this.setState({ processing: `Payment failed ${payload.error.message}` });
      // setProcessing(false);
      this.setState({ processing: false });
    } else {
      // setError(null);
      this.setState({ error: null });
      // setProcessing(false);
      this.setState({ processing: false });
      // setSucceeded(true);
      this.setState({ succeeded: true });

      window.location.href = "#/PaymentSuccessful";
    }
  };

  setClientSecret(data) {
    this.setState({ clientSecret: data });
  }

  paymentSuccess(isSuccess) {
    if (isSuccess) {
      return (
        <div>
          {" "}
          Payment succeeded, see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`}>
            {" "}
            Stripe dashboard.{" "}
          </a>
        </div>
      );
    }
  }

  async componentDidMount() {
    this.props.getBasketProducts(this.props.auth);
    // Create PaymentIntent as soon as the page loads

    await window
      //.fetch("https://localhost:5001/api/pay", {
      //  .fetch(  "http://ec2-3-19-26-38.us-east-2.compute.amazonaws.com:8888/api/pay", {
       .fetch(apiConnection + "pay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.props.basketProducts),
        }
      )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setClientSecret(data.clientSecret);
      });
  }

  render() {
    const { basketProducts, auth, stripe, elements } = this.props;

    return (
      <>
        <form
          id="payment-form"
          style={{ textAlign: "center" }}
          onSubmit={this.handleSubmit}
        >
          <CardElement id="card-element" onChange={this.handleChange} />

          <CButton
            type="submit"
            size="md"
            color="primary"
            style={{ marginTop: "10px" }}
            onSubmit={this.handleSubmit}
            disabled={
              this.state.processing ||
              this.state.disabled ||
              this.state.succeeded
            }
          >
            {/* <button disabled={processing || disabled || succeeded} id="submit"> */}
            <span id="button-text">
              {this.state.processing ? "Processing" : "Pay Now"}
            </span>
          </CButton>

          {/* Show any error that happens when processing the payment */}
          {this.state.error && (
            <div className="card-error" role="alert">
              {this.state.error}
            </div>
          )}

          {this.paymentSuccess(this.state.succeeded)}
        </form>
      </>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    basketProducts: state.api.basketProducts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBasketProducts: (auth) => dispatch(handleGetBasketProductsForUser(auth)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

/// using hoooooooks

// import React, { useState, useEffect } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// import { CButton, CCol, CRow } from "@coreui/react";

// import CardSection from "./CardSection";

// export default function CheckoutForm(props) {
//   const [succeeded, setSucceeded] = useState(false);
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState("");
//   const [disabled, setDisabled] = useState(true);
//   const [clientSecret, setClientSecret] = useState("");
//   const stripe = useStripe();
//   const elements = useElements();

//   //1st // useEffect its onComponentDidLoad
//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     console.log("Hereee: "+ props.basketProducts);
//     console.log("props.auth: "+ props.auth);

//     window
//       .fetch("https://localhost:5001/api/pay", {
//         // .fetch("http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/create-payment-intent", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//        body: JSON.stringify(props.basketProducts),
//       })
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         setClientSecret(data.clientSecret);
//       });
//   }, []);

//   const handleChange = async (event) => {
//     // Listen for changes in the CardElement
//     // and display any errors as the customer types their card details
//     setDisabled(event.empty);
//     setError(event.error ? event.error.message : "");
//   };

//   //2nd
//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     setProcessing(true);
//     const payload = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: ev.target.name.value,
//         },
//       },
//     });
//     if (payload.error) {
//       setError(`Payment failed ${payload.error.message}`);
//       setProcessing(false);
//     } else {
//       setError(null);
//       setProcessing(false);
//       setSucceeded(true);
//     }
//   };
//   return (
//      <>
//       <form id="payment-form" style={{textAlign: 'center'}} onSubmit={handleSubmit}>

//           <CardElement id="card-element" onChange={handleChange} />

//         <CButton type="submit" size="md" color="primary" onSubmit={handleSubmit}>
//          {/* <button disabled={processing || disabled || succeeded} id="submit"> */}
//             <span id="button-text">
//               {processing ? (
//                 <div className="spinner" id="spinner"></div>
//               ) : (
//                 "Pay Now"
//               )}
//             </span>
//             </CButton>
//           {/* </button> */}

//            {/* Show any error that happens when processing the payment */}
//         {error && (
//           <div className="card-error" role="alert">
//             {error}
//           </div>
//         )}
//         {/* Show a success message upon completion */}

//       </form>

//    <p className={succeeded ? "result-message" : "result-message hidden"}>
//           Payment succeeded, see the result in your
//           <a href={`https://dashboard.stripe.com/test/payments`}>
//             {" "}
//             Stripe dashboard.
//           </a>
//         </p>
// </>

//   );
// }
