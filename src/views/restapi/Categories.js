import React, { Component } from "react";
import { connect } from "react-redux";


import {
  handleGetCategories,
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
import CIcon from "@coreui/icons-react";

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "",
    };
  }

  sendCatName = (categoryName, categoryId) => {
    this.props.getCategoryName(categoryName);
    this.props.getCategoryId(categoryId);
  };

  // componentDidMount = () => this.props.deleteCategories(1);

  render() {
    const { categories } = this.props;
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
                            this.sendCatName("", "");
                          } else {
                            this.setState({ activeTab: category.id });
                            this.sendCatName(category.name, category.id);
                          }
                        }}
                        action
                        active={this.state.activeTab === category.id}
                      >
                        {category.id} {category.name}
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
                          this.props.deleteCategories(category.id);
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
    categories: state.api.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(handleGetCategories()),
    handlePost: (category) => dispatch(handlePostCategories(category)),
    deleteCategories: (categoryId) =>
      dispatch(handleDeleteCategories(categoryId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
