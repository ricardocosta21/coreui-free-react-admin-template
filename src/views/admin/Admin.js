/*
 * FeaturePage
 *
 * List all the features
 */
import React, { Component, Suspense} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  handleGetCategoriesByClientUID,
  handlePostCategories,
  handleDeleteCategories,
  handleGetProductsWithId,
  handlePostProducts,
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

import { FaPlus, FaTrash } from 'react-icons/fa';

const Categories = React.lazy(() => import('./Categories'));

const Products = React.lazy(() => import('./Products'));


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class Admin extends Component {
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

  AddCategory = (e) => {
    e.preventDefault();
    var category = {
      name: this.state.categoryName,
    };
    this.props.handlePostCat(category, this.props.auth);
  };

  AddProduct = (categoryId, auth) => {
    if (categoryId === null) {
      return;
    }

    var product = {
      name: this.state.productName,
      price: this.state.productPrice,
      categoryId: this.state.selectedCategoryId,
    };
    // console.log("product! uid: " + JSON.stringify(clientUID));
    this.props.handlePostPro(product, auth);
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

  componentDidMount = () => {
    this.props.getCategories(this.props.auth);
    this.props.getProducts(null, this.props.auth);
    this.handleClearProduct();
  };

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
      this.props.getProducts(category, this.props.auth);
    }
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
       <Suspense fallback={loading}>
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
                      <CLabel htmlFor="email-input">Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="categoryName"
                        style={{ textTransform: "capitalize" }}
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
                  <FaPlus /> Add
                </CButton>
                <CButton
                  type="reset"
                  size="sm"
                  color="danger"
                  onClick={this.handleClearCategory}
                >
                  <FaTrash /> Clear
                </CButton>
              </CCardFooter>
            </CCard>

            {/* Categories list */}
            <div className="ItemsList">
              <Categories
                categories={categories}
                // getCategoryName={this.getCategoryName.bind(this)}
                // getCategoryId={this.getCategoryId.bind(this)}
                getCategory={this.getCategory.bind(this)}
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
                      <CLabel htmlFor="email-input">Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        style={{ textTransform: "capitalize" }}
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
                  disabled={this.state.selectedCategoryId === "" ? true : false}
                  onClick={() => {
                    this.AddProduct(this.state.selectedCategoryId, auth);
                  }}
                >
                   <FaPlus /> Add
                </CButton>
                <CButton
                  type="reset"
                  size="sm"
                  color="danger"
                  onClick={this.handleClearProduct}
                >
                  <FaTrash /> Clear
                </CButton>
              </CCardFooter>
            </CCard>

            {/* Products list */}
            <div className="ItemsList">
              <Products products={products} />
            </div>
          </CCol>
        </CRow>
      </>
      </Suspense>
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
    getCategories: (auth) => dispatch(handleGetCategoriesByClientUID(auth)),
    handlePostCat: (category, auth) =>
      dispatch(handlePostCategories(category, auth)),
    deleteCategories: (category, auth) =>
      dispatch(handleDeleteCategories(category, auth)),

    getProducts: (category, auth) =>
      dispatch(handleGetProductsWithId(category, auth)),
    handlePostPro: (product, auth) =>
      dispatch(handlePostProducts(product, auth)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
