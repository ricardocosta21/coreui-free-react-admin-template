import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { connect } from "react-redux";
import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import {
  handleGetBasketProductsForUser,
} from "../../actions/apiActions.js";

import {
  CCol,
  CRow,
} from "@coreui/react";

import BasketProductsCheckout from "../../views/admin/BasketProductsCheckout";
import CheckoutForm from "./CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51H7KdVHWUwuAN6yQmtIC9Hg0o6Ott8QWOfcGDoA6taCr9MzUBsFicjG83R69fOcYW3bvC0KG3EMPDp45m67IDGm200zF2Q9Q6A"
);

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryId: "",
      categoryName: "",
      productName: "",
      productPrice: "",
      listDataFromChild: null,
      selectedCategoryName: "",
      selectedCategoryId: "",
    };
    this.baseCategory = {
      categoryId: "",
      categoryName: "",
    };
    this.baseProduct = {
      productName: "",
      productPrice: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount = async () => {
    this.props.getBasketProducts(this.props.auth);
  };

  render() {
    const { auth, basketProducts } = this.props;

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    
    return (
      <Elements stripe={stripePromise}>
        <CRow className="justify-content-center">
          <CCol xs="12" md="5">
            <div className="BasketProducts">
              <BasketProductsCheckout basketProducts={basketProducts} />
                <InjectedCheckoutForm/>
            </div>
          </CCol>
        </CRow>
      
      </Elements>
    );
  }
}

const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({elements, stripe}) => (
        <CheckoutForm elements={elements} stripe={stripe} />
      )}
    </ElementsConsumer>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
