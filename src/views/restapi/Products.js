import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import {
  handleGetProducts,
  handlePostProducts,
  handleDeleteProducts,
} from "../../actions/apiActions";

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CForm,
  CCardHeader,
  CFormGroup,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

export class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "",
    };
  }

  sendProName = (productName) => {
    this.props.getProductName(productName);
  };

  
  render() {
    const { products } = this.props;
    if (products == null) return <div> Nothing to see here. </div>;

    return (
      <div>
        <CCard className="cardContainer">
          <CCardHeader>Products</CCardHeader>
          <CCardBody>
            <CListGroup id="list-tab" role="tablist">
              {products.map((product) => (
                <div key={product.id}>
                  <CFormGroup row>
                    <CCol xs="12" md="10">
                      <CListGroupItem
                        onClick={() => {
                          if (product.id === this.state.activeTab) {
                            this.setState({ activeTab: "" });
                            this.sendProName("");
                          } else {
                            this.setState({ activeTab: product.id });
                            this.sendProName(product.name);
                          }
                        }}
                        action
                        active={this.state.activeTab === product.id}
                      >
                        {product.id} {product.name} {product.price}
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
                          this.props.deleteProducts(product.id);
                        }}
                      >
                        <CIcon name="cilTrash" />
                      </CButton>
                    </CCol>
                  </CFormGroup>
                </div>
              ))}
            </CListGroup>
          </CCardBody>
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch(handleGetProducts()),
    handlePost: (product) => dispatch(handlePostProducts(product)),
    deleteProducts: (productId) =>
      dispatch(handleDeleteProducts(productId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
