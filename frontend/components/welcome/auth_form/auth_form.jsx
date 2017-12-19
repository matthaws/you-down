import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signup, login } from "../../../actions/session_actions";
import "./auth_form.css";

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      zip: "",
      formType: this.props.formType
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchForm = this.switchForm.bind(this);
    this.guestLogIn = this.guestLogIn.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  guestLogIn() {
    this.props.login({ email: "Guest@Guest.com", password: "GUESTGUEST" });
  }

  switchForm() {
    if (this.state.formType === "signup") {
      this.setState({ formType: "login", errors: [] });
    } else {
      this.setState({ formType: "signup", errors: [] });
    }
  }

  update(property) {
    return e =>
      this.setState({
        [property]: e.target.value
      });
  }

  handleSubmit() {
    if (this.state.formType === "signup") {
      this.props.signup({
        location_zip: this.state.zip,
        full_name: this.state.name,
        email: this.state.email,
        password: this.state.password
      });
    } else {
      this.props.login({
        email: this.state.email,
        password: this.state.password
      });
    }
  }

  render() {
    let errorsList = [];
    if (this.props.errors.length > 0) {
      let i = 1;
      this.state.errors.forEach(error => {
        errorsList.push(<li key={i}>{error}</li>);
        i += 1;
      });

      errorsList = (
        <div className="errors">
          <ul>{errorsList}</ul>
        </div>
      );
    }
    if (this.state.formType === "signup") {
      return (
        <section onKeyPress={this.handleKeyPress}>
          <h1>Sign up</h1>
          {errorsList}
          <form onSumbit={this.handleSubmit}>
            <h1>Your name:</h1>
            <input
              type="text"
              onChange={this.update("name")}
              value={this.state.name}
            />
            <h1>Your zip:</h1>
            <input
              type="text"
              onChange={this.update("zip")}
              value={this.state.zip}
            />
            <h1>Your email:</h1>
            <input
              type="text"
              onChange={this.update("email")}
              value={this.state.email}
            />
            <h1>Your password:</h1>
            <input
              type="password"
              onChange={this.update("email")}
              value={this.state.password}
            />
            <div>
              <input
                type="submit"
                className="main-button"
                value="Start Your Adventure"
              />
            </div>
          </form>
          <p onClick={this.switchForm}>Log in instead</p>
        </section>
      );
    }
    return (
      <section>
        <h1>Log In</h1>
        {errorsList}
        <form onSumbit={this.handleSubmit}>
          <h1>Your email:</h1>
          <input
            type="text"
            onChange={this.update("email")}
            value={this.state.email}
          />
          <h1>Your password:</h1>
          <input
            type="password"
            onChange={this.update("password")}
            value={this.state.password}
          />
          <div>
            <input type="submit" className="main-button">
              Welcome back!
            </input>
          </div>
        </form>
        <p onClick={this.switchForm}>Sign in instead</p>
        <h4 className="guestlogin" onClick={this.guestLogIn}>
          Guest / Demo Log in
        </h4>
      </section>
    );
  }
}

AuthForm.propTypes = {
  errors: PropTypes.array.isRequired,
  signup: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired
};

AuthForm.defaultProps = {
  errors: [],
  formTypes: "signup"
};

const mapStateToProps = state => ({
  errors: state.session.errors
});

const mapDispatchToProps = dispatch => ({
  signup: newUser => dispatch(signup(newUser)),
  login: user => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
