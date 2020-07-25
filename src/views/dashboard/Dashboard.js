import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
// import CreateProject from "../../containers/CreateProject";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  render() {
    const { auth } = this.props;

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    return (
      <>
        
         <div>
           <h1>Main Page 1 </h1>
         </div> 
          
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps)
)(Dashboard);
