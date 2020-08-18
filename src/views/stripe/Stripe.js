import { connect } from "react-redux";
import React, { Component } from "react";

import { Redirect } from "react-router-dom";
import {
  handleGetCategoriesByClientUID,
  handlePostCategories,
  handleDeleteCategories,
  handleGetProductsWithId,
  handlePostProducts,
  handleDeleteProducts,
  handleGetBasketProductsForUser,
  handleClearProducts,
} from "../../actions/apiActions.js";

import {
  CCol,
  CRow,
} from "@coreui/react";

import CategoriesList from "../../views/admin/CategoriesList";
import ProductsList from "../../views/admin/ProductsList";
import BasketProducts from "../../views/admin/BasketProducts";
import CheckoutForm from "./CheckoutForm";

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

      this.props.getProducts(category, this.props.auth);
    } else {
      newState = {
        selectedCategoryId: "",
        selectedCategoryName: "",
      };
      this.setState(newState);
      this.props.getProducts(null, this.props.auth);
    }
  };

  componentDidMount = () => {
    this.props.getCategories(this.props.auth);

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
    getCategories: (auth) => dispatch(handleGetCategoriesByClientUID(auth)),
    handlePostCat: (category, auth) => dispatch(handlePostCategories(category, auth)),
    deleteCategories: (category, auth) => dispatch(handleDeleteCategories(category, auth)),

    getProducts: (category, auth) => dispatch(handleGetProductsWithId(category, auth)),
    clearProducts: () => dispatch(handleClearProducts()),
    handlePostPro: (product, auth) => dispatch(handlePostProducts(product, auth)),
    deleteProducts: (proId, auth) => dispatch(handleDeleteProducts(proId, auth)),

    getBasketProducts: (auth) => dispatch(handleGetBasketProductsForUser(auth)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stripe);
