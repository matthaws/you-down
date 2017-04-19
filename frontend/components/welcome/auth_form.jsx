import React from 'react';
import ReactDOM from 'react-dom';
import { signup, login } from "../../actions/session_actions";
import { connect } from 'react-redux';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "", zip: "", errors: [], formType: this.props.formType }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.switchForm = this.switchForm.bind(this);
    this.guestLogIn = this.guestLogIn.bind(this);
  }

  guestLogIn() {
    this.props.login({email: "GUEST", password: "GUESTGUEST"})
  }

  switchForm() {
    if (this.state.formType === "signup") {
      this.setState({formType: "login", errors: []})
    } else {
      this.setState({formType: "signup", errors: []})
    }
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      let newErrors = nextProps.errors.responseJSON || [nextProps.errors.responseText];
      this.setState({errors: newErrors })

    }
  }

  handleSubmit() {
    if (this.state.formType === "signup") {
    this.props.signup({
      location_zip: this.state.zip,
      full_name: this.state.name,
      email: this.state.email,
      password: this.state.password })
    } else {
      this.props.login({
        email: this.state.email,
        password: this.state.password
      })
    }
  }

  render() {
    let errorsList = [];
    if (this.state.errors && this.state.errors.length > 0 ) {
      let i = 1
      this.state.errors.forEach( (error) => {
        errorsList.push(<li key={i}>{error}</li>)
        i++
      })

      errorsList = (
       <div className="errors">
        <ul>
          {errorsList}
        </ul>
      </div>
      )
    }
    if (this.state.formType === "signup") {
    return (
      <section>
        <h1>Sign up</h1>
        {errorsList}
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
        <p onClick={this.switchForm}>Log in instead</p>
    </section>
    )
  } else {
    return (
      <section>
        <h1>Log In</h1>
        {errorsList}
        <h1>Your email:</h1>
          <input type="text" onChange={this.handleEmailChange} value={this.state.email} />
        <h1>Your password:</h1>
          <input type="password" onChange={this.handlePasswordChange} value={this.state.password} />
        <div>
          <button onClick={this.handleSubmit} className="main-button">Welcome back!</button>
        </div>
        <p onClick={this.switchForm}>Sign in instead</p>
        <h4 className="guestlogin" onClick={this.guestLogIn}>Guest / Demo Log in</h4>
    </section>
    )
  }
  }
}


const mapStateToProps = (state) => {
  return {
    errors: state.session.errors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (newUser) => dispatch(signup(newUser)),
    login: (user) => dispatch(login(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
