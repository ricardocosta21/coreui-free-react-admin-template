/*
 * FeaturePage
 *
 * List all the features
 */
import React, { Component} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  handleGetCategories,
  handlePostCategories,
  handleDeleteCategories,
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
    this.props.handlePost(category);
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

  componentDidMount = () => this.props.getCategories();

  getCategoryName = (categoryName) => {
    let newState = this.state;
    newState = {
      selectedCategoryName: categoryName,
    };
    this.setState(newState);
  };

  render() {
    const { auth, categories} = this.props;

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
                  onClick={this.AddCategory}
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(handleGetCategories()),
    handlePost: (category) => dispatch(handlePostCategories(category)),
    deleteCategories: (catId) => dispatch(handleDeleteCategories(catId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
