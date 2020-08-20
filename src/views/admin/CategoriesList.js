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

export class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "",
    };
  }

  // sendCatName = (categoryName, categoryId) => {
  //   this.props.getCategoryName(categoryName);
  //   this.props.getCategoryId(categoryId);
  // };

  sendCategory = (category) => {
    this.props.getCategory(category);
  };

  render() {
    const { categories } = this.props;
    if (categories == null) return <div> Nothing to see here. </div>;

    return (
      <div>
        <CCard className="cardContainer">
          <CCardHeader>Categories List</CCardHeader>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
