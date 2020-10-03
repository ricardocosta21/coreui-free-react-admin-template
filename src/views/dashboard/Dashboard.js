import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
// import CreateProject from "../../containers/CreateProject";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
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
            paddingTop: '60px',
            textAlign: "center",
          }}
        >
          <h3>Hola</h3>
          <h1 style={{ textTransform: "capitalize" }}>
            {" "}
            {profile.displayName}
            {"!"}
          </h1>
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

export default compose(connect(mapStateToProps))(Dashboard);
