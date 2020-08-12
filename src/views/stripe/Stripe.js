import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { connect } from "react-redux";
import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import {
  handleGetCategories,
  handlePostCategories,
  handleDeleteCategories,
  handleGetProductsWithId,
  handlePostProducts,
  handleDeleteProducts,
  handleGetBasketProductsForUser,
  handleClearProducts,
} from "../../actions/apiActions.js";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import CategoriesList from "../../views/restapi/CategoriesList";
import ProductsList from "../../views/restapi/ProductsList";
import BasketProducts from "../../views/restapi/BasketProducts";
import CheckoutForm from "./CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51H7KdVHWUwuAN6yQmtIC9Hg0o6Ott8QWOfcGDoA6taCr9MzUBsFicjG83R69fOcYW3bvC0KG3EMPDp45m67IDGm200zF2Q9Q6A"
);

class Stripe extends Component {
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

  getCategory = (category) => {
    let newState = this.state;
    if (category != null) {
      newState = {
        selectedCategoryId: category.id,
        selectedCategoryName: category.name,
      };
      this.setState(newState);

      this.props.getProducts(category);
    } else {
      newState = {
        selectedCategoryId: "",
        selectedCategoryName: "",
      };
      this.setState(newState);
      this.props.getProducts();
    }
  };

  componentDidMount = () => {
    this.props.getCategories();

    this.props.clearProducts();
    
    //It worked!
    this.props.getBasketProducts(this.props.auth);
  };

  render() {
    const { auth, categories, products, basketProducts } = this.props;

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    return (
      <Elements stripe={stripePromise}>
        <CRow>
          <CCol xs="12" md="6">
            <div className="CategoriesList">
              <CategoriesList
                categories={categories}
                // getCategoryName={this.getCategoryName.bind(this)}
                // getCategoryId={this.getCategoryId.bind(this)}
                getCategory={this.getCategory.bind(this)}
              />
            </div>

            <div className="ProductsList">
              <ProductsList products={products} />
            </div>
          </CCol>
          <CCol>
            <div className="BasketProducts">
              <BasketProducts basketProducts={basketProducts} />
            </div>
          </CCol>
        </CRow>

{/* <CheckoutForm /> */}
     
      </Elements>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    categories: state.api.categories,
    products: state.api.products,
    basketProducts: state.api.basketProducts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(handleGetCategories()),
    handlePostCat: (category) => dispatch(handlePostCategories(category)),
    deleteCategories: (catId) => dispatch(handleDeleteCategories(catId)),

    //getProducts: () => dispatch(handleGetProducts()),
    getProducts: (category) => dispatch(handleGetProductsWithId(category)),
    clearProducts: () => dispatch(handleClearProducts()),
    handlePostPro: (product, auth) => dispatch(handlePostProducts(product, auth)),
    deleteProducts: (proId, auth) => dispatch(handleDeleteProducts(proId, auth)),

    getBasketProducts: (auth) => dispatch(handleGetBasketProductsForUser(auth)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stripe);
