import React, { Component } from "react";
import { connect } from "react-redux";
import {
  handlePostProducts,
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

import { FaTrash } from 'react-icons/fa';

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
                    <CCol xs="12" md="10">
                      <CListGroupItem>
                        <CRow>
                          <CCol>{basketProduct.name}</CCol>
                          <CCol>
                            {"£"}
                            {basketProduct.price}
                          </CCol>
                        </CRow>
                      </CListGroupItem>
                      <CButton
                        style={{
                          position: "absolute",
                          top: "0%",
                          left: "98%",
                          padding: "10.5px 16px",
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
    //getProducts: () => dispatch(handleGetProducts()),
    getBasketProducts: (category) =>
      dispatch(handleGetBasketProductsForUser(category)),
    handlePost: (product, auth) => dispatch(handlePostProducts(product, auth)),
    deleteBasketProducts: (bProductId, auth) =>
      dispatch(handleDeleteBasketProduct(bProductId, auth)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasketProducts);
