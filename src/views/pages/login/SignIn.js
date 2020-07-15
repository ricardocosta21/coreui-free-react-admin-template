import React, { useState, Component } from "react";
import { Link } from "react-router-dom";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { connect } from "react-redux";
import { signIn, signInWithGoogle } from "../../../actions/authActions";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    photoURL: "",
    displayName: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  handleSubmitGoogle = (e) => {
    e.preventDefault();
    this.props.signInWithGoogle(this.state);
  };

  render() {
    const { authError, auth } = this.props;

    if (auth.uid) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="c-app c-default-layout flex-row align-items-center text-center">
        <CContainer>
          <CRow className="justify-content-center ">
            <CCol md="9" lg="6" xl="6">
              <CCardGroup>
                <CCard>
                  <CCardBody>
                    <CForm>
                      <h1>Sign In</h1>
                      <CRow className="px-5 py-2 m-2">
                        <CCol>
                          <CButton
                            color="primary"
                            className="flex flex-col "
                            onClick={this.handleSubmitGoogle}
                          >
                            Sign In With Google 
                          </CButton>
                        </CCol>
                      </CRow>

                      <CRow className="px-4 py-2 m-2 justify-content-center ">                      
                       <CCol>
                          {"Sign in or "}
                        <Link to="/signup" >                      
                          Create an account
                        </Link>
                        </CCol>
                      </CRow>

                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          placeholder="Email"
                          autoComplete="email"
                          id="email"
                          onChange={this.handleChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          id="password"
                          onChange={this.handleChange}
                        />
                      </CInputGroup>
                      <CRow className="justify-content-center">
                        <CCol xs="4">
                          <CButton
                            color="primary"
                            className="px-6"
                            onClick={this.handleSubmit}
                          >
                            Sign in
                          </CButton>
                          <div className="center red-text px-0 py-3">
                            {authError ? <p>{authError}</p> : null}
                          </div>
                        </CCol>

                        <CCol xs="4">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                     
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
    signInWithGoogle: () => dispatch(signInWithGoogle()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
