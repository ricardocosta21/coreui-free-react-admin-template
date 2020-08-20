import React, { Component } from "react";
import { connect } from "react-redux";

import {
  handleGetCategoriesByClientUID,
  handlePostCategories,
  handleDeleteCategories,
} from "../../actions/apiActions";

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CCardHeader,
  CFormGroup,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import { FaTrash } from 'react-icons/fa';

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "",
    };
  }

  sendCategory = (category) => {
    this.props.getCategory(category);
  };

  render() {
    const { categories, auth } = this.props;
    if (categories == null) return <div> Nothing to see here. </div>;

    return (
      <div>
        <CCard className="cardContainer">
          <CCardHeader>Categories</CCardHeader>
          <CCardBody>
            <CListGroup id="list-tab" role="tablist">
              {categories.map((category) => (
                <div key={category.id}>
                  <CFormGroup row>
                    <CCol xs="12" md="10">
                      <CListGroupItem
                        onClick={() => {
                          if (category.id === this.state.activeTab) {
                            this.setState({ activeTab: "" });
                            this.sendCategory(null);
                          } else {
                            this.setState({ activeTab: category.id });
                            this.sendCategory(category);
                          }
                        }}
                        action
                        active={this.state.activeTab === category.id}
                      >
                        {category.name}
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
                          this.props.deleteCategories(category, auth);
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
    categories: state.api.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: (auth) => dispatch(handleGetCategoriesByClientUID(auth)),
    handlePost: (category, auth) => dispatch(handlePostCategories(category, auth)),
    deleteCategories: (category, auth) => dispatch(handleDeleteCategories(category, auth)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
