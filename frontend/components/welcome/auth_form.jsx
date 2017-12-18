import React from 'react';
import ReactDOM from 'react-dom';
import { signup, login } from "../../actions/session_actions";
import { connect } from 'react-redux';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "", zip: "", errors: [], formType: this.props.formType };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchForm = this.switchForm.bind(this);
    this.guestLogIn = this.guestLogIn.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  guestLogIn() {
    this.props.login({email: "Guest@Guest.com", password: "GUESTGUEST"});
  }

  switchForm() {
    if (this.state.formType === "signup") {
      this.setState({formType: "login", errors: []});
    } else {
      this.setState({formType: "signup", errors: []});
    }
  }

  update(property) {
    return e => this.setState({
      [property]: e.target.value
    });
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      let newErrors = nextProps.errors.responseJSON || [nextProps.errors.responseText];
      this.setState({errors: newErrors });

    }
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
    if (this.state.errors && this.state.errors.length > 0 ) {
      let i = 1;
      this.state.errors.forEach( (error) => {
        errorsList.push(<li key={i}>{error}</li>)
        i++
      });

      errorsList = (
       <div className="errors">
        <ul>
          {errorsList}
        </ul>
      </div>
    );
    }
    if (this.state.formType === "signup") {
    return (
      <section onKeyPress={this.handleKeyPress}>
        <h1>Sign up</h1>
        {errorsList}
        <h1>Your name:</h1>
          <input type="text" onChange={this.update('name')} value={this.state.name} />
        <h1>Your zip:</h1>
          <input type="text" onChange={this.update('zip')} value={this.state.zip} />
        <h1>Your email:</h1>
          <input type="text" onChange={this.update('email')} value={this.state.email} />
        <h1>Your password:</h1>
          <input type="password" onChange={this.update('email')} value={this.state.password} />
        <div>
          <button onClick={this.handleSubmit} className="main-button">Start Your Adventure</button>
        </div>
        <p onClick={this.switchForm}>Log in instead</p>
    </section>
  );
  } else {
    return (
      <section>
        <h1>Log In</h1>
        {errorsList}
        <h1>Your email:</h1>
          <input type="text" onChange={this.update('email')} value={this.state.email} />
        <h1>Your password:</h1>
          <input type="password" onChange={this.update('password')} value={this.state.password} />
        <div>
          <button onClick={this.handleSubmit} className="main-button">Welcome back!</button>
        </div>
        <p onClick={this.switchForm}>Sign in instead</p>
        <h4 className="guestlogin" onClick={this.guestLogIn}>Guest / Demo Log in</h4>
    </section>
  );
  }
  }
}


const mapStateToProps = (state) => {
  return {
    errors: state.session.errors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (newUser) => dispatch(signup(newUser)),
    login: (user) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
