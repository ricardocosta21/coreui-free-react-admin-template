import React, { Component } from "react";
import { connect } from "react-redux";
import {
  // handlePostProducts,
  handleDecrementBasketProduct,
  handleDeleteBasketProduct,
  handleGetBasketProductsForUser,
} from "../../actions/apiActions";

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CRow,
  CCardHeader,
  CFormGroup,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";

import { FaTrash, FaMinus } from 'react-icons/fa';

export class BasketProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "",
    };
  }

  //   sendProName = (productName) => {
  //     this.props.getProductName(productName);
  //   };
  //   componentDidMount = (auth) => this.props.getBasketProducts(auth);

  render() {
    const { basketProducts, auth } = this.props;

    if (basketProducts == null) return <div> Nothing to see here. </div>;

    return (
      <div>
        <CCard className="cardContainer">
          <CCardHeader>Basket Products</CCardHeader>
          <CCardBody>
            <CListGroup id="list-tab" role="tablist">
              {basketProducts.map((basketProduct) => (
                <div key={basketProduct.id}>
                  <CFormGroup row>
                    <CCol xs="12" md="9">
                      <CListGroupItem>
                        <CRow>
                          <CCol>{basketProduct.name}</CCol>
                          <CCol>
                            {"£"}
                            {basketProduct.price}
                          </CCol>  
                          <CCol>{basketProduct.quantity}</CCol>
                        </CRow>
                      </CListGroupItem>
                        <CButton
                        style={{
                          position: "absolute",
                          top: "6%",
                          left: "97%",
                          padding: "8.5px 12px",
                        }}
                        color="danger"
                        type="submit"
                        onClick={() => {
                          this.props.handleDecrement(
                            basketProduct.id,
                            auth
                          );
                        }}
                      >
                        <FaMinus/>
                      </CButton>
                      <CButton
                        style={{
                          position: "absolute",
                          top: "6%",
                          left: "112%",
                          padding: "8.5px 12px",
                        }}
                        color="danger"
                        type="submit"
                        onClick={() => {
                          this.props.deleteBasketProducts(
                            basketProduct.id,
                            auth
                          );
                        }}
                      >
                        <FaTrash/>
                      </CButton>
                    </CCol>
                  </CFormGroup>
                </div>
              ))}
            </CListGroup>
          </CCardBody>

          <CCardFooter className="text-center">
            <CButton href="#/checkout" type="submit" color="success">
              Proceed to Checkout
            </CButton>
          </CCardFooter>
        </CCard>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    products: state.api.products,
    basketProducts: state.api.basketProducts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBasketProducts: (category) => dispatch(handleGetBasketProductsForUser(category)),
    // handlePost: (product, auth) => dispatch(handlePostProducts(product, auth)),
    handleDecrement: (bProductId, auth) => dispatch(handleDecrementBasketProduct(bProductId, auth)),
    deleteBasketProducts: (bProductId, auth) => dispatch(handleDeleteBasketProduct(bProductId, auth)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketProducts);
