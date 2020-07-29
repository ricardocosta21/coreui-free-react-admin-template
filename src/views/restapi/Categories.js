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

  sendCatName = (categoryName) => {
    this.props.getCategoryName(categoryName);
  };

  // componentDidMount = () => this.props.deleteCategories(1);

  render() {
    const { categories } = this.props;
    if (categories == null) return <div> Nothing to see here. </div>;

    return (
      <div>
        <CCard className="cardContainer">
          <CCardBody>
            <CCol xs="12" md="9">
              <CListGroup id="list-tab" role="tablist">
                {categories.map((category) => (
                  <div key={category.id}>
                    <CListGroupItem
                      onClick={() => {
                        this.setState({ activeTab: category.id });
                        this.sendCatName(category.name);
                      }}
                      action
                      active={this.state.activeTab === category.id}
                    >
                      {" "}
                      {category.id} {category.name}
                      <CButton
                        className="float-right"
                        type="button"
                        color="danger"
                        onClick={() => {
                          this.props.deleteCategories(category.id);
                        }}
                      >
                        <CIcon name="cil-ban" />
                      </CButton>
                    </CListGroupItem>
                  </div>
                ))}
              </CListGroup>
            </CCol>
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
    deleteCategories: (categoryId) => dispatch(handleDeleteCategories(categoryId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
