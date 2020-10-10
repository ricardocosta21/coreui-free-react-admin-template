import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
// import CreateProject from "../../containers/CreateProject";
import { Redirect } from "react-router-dom";

import {
  handleDeleteAllBasketProduct,
} from "../../actions/apiActions";

class PaymentSuccessful extends Component {
  componentDidMount() {

    this.props.deleteAllBasketProducts(this.props.auth);

    setTimeout(function () {
      window.location.href = "#";
    }, 5000);
  }

  render() {
    const { auth, profile } = this.props;

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    // console.log("uid! " + auth.uid);
    return (
      <>
        <div
          style={{
            paddingTop: "60px",
            textAlign: "center",
          }}
        >
          <h3>Thank you for your Order</h3>
          <h1 style={{ textTransform: "capitalize" }}>
            {profile.displayName}
            {"!"}
          </h1>
        </div>
        <div
          style={{
            paddingTop: "60px",
            textAlign: "center",
          }}
        >
          <h5>You will be redirected to the Dashboard within 5 seconds...</h5>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

function mapDispatchToProps(dispatch) {
  return {
     deleteAllBasketProducts: (auth) =>
     dispatch(handleDeleteAllBasketProduct(auth)),
  };
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(PaymentSuccessful);
