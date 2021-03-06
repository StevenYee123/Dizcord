import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import { signup, login, clearSessionErrors } from "../../actions/session_actions";
import SessionForm from "./session_form";

const mapStateToProps = ({ errors }) => ({
    errors: errors.session,
    formType: "Sign Up",
    navLink: "/login",
    classNum: Math.floor(Math.random() * 6)
});

const mapDispatchToProps = (dispatch) => ({
    processForm: (user) => dispatch(signup(user)),
    manualLogin: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearSessionErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);