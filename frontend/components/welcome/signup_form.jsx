import React from 'react';
import ReactDOM from 'react-dom';
import { signup } from "../../actions/session_actions";
import { connect } from 'react-redux';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "", zip: "", errors: {} }
    if (this.props.session) {
      this.setState = { errors: this.props.session.errors};
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
  }

  handleEmailChange(e) {
    this.setState( { email: e.target.value})
  }

  handleNameChange(e) {
    this.setState( { name: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState( { password: e.target.value})
  }

  handleZipChange(e) {
    this.setState( { zip: e.target.value })
  }

  handleSubmit() {
    this.props.signup({
      location_zip: this.state.zip,
      full_name: this.state.name,
      email: this.state.email,
      password: this.state.password })
  }

  render() {
    return (
    <section>
      <h1>Sign up</h1>
      <h1>Your name:</h1>
        <input type="text" onChange={this.handleNameChange} value={this.state.name} />
      <h1>Your zip:</h1>
        <input type="text" onChange={this.handleZipChange} value={this.state.zip} />
      <h1>Your email:</h1>
        <input type="text" onChange={this.handleEmailChange} value={this.state.email} />
      <h1>Your password:</h1>
        <input type="password" onChange={this.handlePasswordChange} value={this.state.password} />
      <div>
        <button onClick={this.handleSubmit} className="main-button">Start Your Adventure</button>
      </div>
  </section>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    errors: state.session.errors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (newUser) => dispatch(signup(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
