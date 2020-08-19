import React, { Component } from "react";
import { connect } from "react-redux";

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CRow,
  CCardHeader,
  CFormGroup,
  CListGroup,
} from "@coreui/react";

export class BasketProductsCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "",
      totalPrice: "",
    };
  }

  calculateTotalPrice = (basketProducts) => {
    var totalPrice = 0;
    for (const product of basketProducts) {
      totalPrice += parseInt(product.price);
    }
    return totalPrice;
  };

  render() {
    const { basketProducts } = this.props;

    if (basketProducts == null) return <div> Nothing to see here. </div>;

    const totalPrice = this.calculateTotalPrice(basketProducts);

    return (
      <div style={{ textAlign: "center" }}>
        <CCard>
          <CCardHeader>Basket Products Checkout</CCardHeader>
          <CCardBody>
            <CListGroup id="list-tab" role="tablist">
              {basketProducts.map((basketProduct) => (
                <div key={basketProduct.id}>
                  <CFormGroup row>
                    <CCol xs="12" md="14">
                      <CRow>
                        <CCol>{basketProduct.name}</CCol>
                        <CCol>
                          {"£"}
                          {basketProduct.price}
                        </CCol>
                      </CRow>
                    </CCol>
                  </CFormGroup>
                </div>
              ))}
            </CListGroup>
          </CCardBody>

          <CCardFooter>
            <h4>
              Total: {"£"}
              {totalPrice}
            </h4>
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
    basketProducts: state.api.basketProducts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasketProductsCheckout);
