import React, { Component } from "react";
import { connect } from "react-redux";
import {
  handleGetProductsWithId,
  // handlePostProducts,
  handleDeleteProducts,
} from "../../actions/apiActions";

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCardHeader,
  CFormGroup,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
// import CIcon from "@coreui/icons-react";

import { FaTrash } from 'react-icons/fa';

export class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "",
    };
  }

  //   sendProName = (productName) => {
  //     this.props.getProductName(productName);
  //   };
  // componentDidMount = (category) => this.props.getProducts(category);

  render() {
    // this.props.getProducts();
    const { products, auth} = this.props;
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
                      style={{
                              textAlign: "center",
                            }}
                        onClick={() => {
                          if (product.id === this.state.activeTab) {
                            this.setState({ activeTab: "" });
                            // this.sendProName("");
                          } else {
                            this.setState({ activeTab: product.id });
                            // this.sendProName(product.name);
                          }
                        }}
                        action
                        // active={this.state.activeTab === product.id}
                      >
                        <CRow>
                          <CCol>{product.name}</CCol>
                          <CCol>
                            {"£"}
                            {product.price}
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
                          this.props.deleteProducts(product, auth);
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
    getProducts: (category, auth) => dispatch(handleGetProductsWithId(category, auth)),
    // handlePost: (product, auth) => dispatch(handlePostProducts(product, auth)),
    deleteProducts: (product, auth) => dispatch(handleDeleteProducts(product, auth)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
