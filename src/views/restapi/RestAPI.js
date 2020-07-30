/*
 * FeaturePage
 *
 * List all the features
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  handleGetCategories,
  handlePostCategories,
  handleDeleteCategories,
  handleGetProducts,
  handlePostProducts,
  handleDeleteProducts,
} from "../../actions/apiActions";

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
import Categories from "./Categories";
import Products from "./Products";

class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryId: "",
      categoryName: "",
      productId: "",
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
      productId: "",
      productName: "",
      productPrice: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  AddCategory = (e) => {
    e.preventDefault();
    var category = {
      id: this.state.categoryId,
      name: this.state.categoryName,
    };
    this.props.handlePostCat(category);
  };

  AddProduct = (categoryId) => {
    var product = {
      id: this.state.productId,
      name: this.state.productName,
      price: this.state.productPrice,
      categoryId: this.state.selectedCategoryId,
    };
    this.props.handlePostPro(product);
  };

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClearCategory = () => {
    this.setState(this.baseCategory);
  };

  handleClearProduct = () => {
    this.setState(this.baseProduct);
  };

  componentDidMount = () => 
  {
    this.props.getCategories();
    this.props.getProducts();
  }


  getCategoryName = (categoryName) => {
    let newState = this.state;
    newState = {
      selectedCategoryName: categoryName,
    };
    this.setState(newState);
  };

  getCategoryId = (categoryId) => {
    let newState = this.state;
    newState = {
      selectedCategoryId: categoryId,
    };
    this.setState(newState);
  };

  getProductName = (productName) => {
    let newState = this.state;
    newState = {
      selectedProductName: productName,
    };
    this.setState(newState);
  };

  render() {
    const { auth, categories, products } = this.props;

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    return (
      <>
        <CRow>
          <CCol xs="12" md="6">
            <CCard>
              <CCardHeader>
                Add
                <small> Categories </small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Id</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="categoryId"
                        value={this.state.categoryId}
                        onChange={this.handleInputChange}
                      />
                      <CFormText>Please enter your category ID</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email-input">Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="categoryName"
                        value={this.state.categoryName}
                        onChange={this.handleInputChange}
                      />
                      <CFormText className="help-block">
                        Please enter your category name
                      </CFormText>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton
                  type="add"
                  size="sm"
                  color="primary"
                  onClick={(e) => {
                    this.AddCategory(e);
                  }}
                >
                  <CIcon name="cil-scrubber" /> Add
                </CButton>
                <CButton
                  type="reset"
                  size="sm"
                  color="danger"
                  onClick={this.handleClearCategory}
                >
                  <CIcon name="cil-ban" /> Reset
                </CButton>
              </CCardFooter>
            </CCard>

            {/* Categories list */}
            <div className="ItemsList">
              <Categories
                categories={categories}
                getCategoryName={this.getCategoryName.bind(this)}
                getCategoryId={this.getCategoryId.bind(this)}
              />
            </div>
          </CCol>

          {/* Add Products */}
          <CCol xs="12" md="6">
            <CCard>
              <CCardHeader>
                Add
                <small> Products</small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  action=""
                  method="post"
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Category</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CLabel>{this.state.selectedCategoryName}</CLabel>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Id</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="productId"
                        value={this.state.productId}
                        onChange={this.handleInputChange}
                      />
                      <CFormText>Please enter your Product Id</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email-input">Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="productName"
                        value={this.state.productName}
                        onChange={this.handleInputChange}
                      />
                      <CFormText className="help-block">
                        Please enter your Product Name
                      </CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email-input">Price</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="productPrice"
                        value={this.state.productPrice}
                        onChange={this.handleInputChange}
                      />
                      <CFormText className="help-block">
                        Please enter your Product Price
                      </CFormText>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton
                  type="add"
                  size="sm"
                  color="primary"
                  onClick={() => {
                    this.AddProduct(this.state.selectedCategoryId);
                  }}
                >
                  <CIcon name="cil-scrubber" /> Add
                </CButton>
                <CButton
                  type="reset"
                  size="sm"
                  color="danger"
                  onClick={this.handleClearProduct}
                >
                  <CIcon name="cil-ban" /> Reset
                </CButton>
              </CCardFooter>
            </CCard>

            {/* Products list */}
            <div className="ItemsList">
              <Products
                products={products}
                getProductName={this.getProductName.bind(this)}
              />
            </div>
          </CCol>
        </CRow>
      </>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    categories: state.api.categories,
    products: state.api.products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(handleGetCategories()),
    handlePostCat: (category) => dispatch(handlePostCategories(category)),
    deleteCategories: (catId) => dispatch(handleDeleteCategories(catId)),

    getProducts: () => dispatch(handleGetProducts()),
    handlePostPro: (product) => dispatch(handlePostProducts(product)),
    deleteProducts: (proId) => dispatch(handleDeleteProducts(proId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
