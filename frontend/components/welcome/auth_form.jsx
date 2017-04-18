import React from 'react';
import ReactDOM from 'react-dom';
import { signup } from "../../actions/session_actions";
import { connect } from 'react-redux';

class SignUpForm extends React.Component {


  render() {
    return (
    <section className="auth-form">
      <h1>Sign Up!</h1>
      <form>
        <label>Your name:
        <input type="text" />
        </label>
        <p>Your email:</p>
          </form>
    </section>
    )
  }
}


const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (newUser) => dispatch(signup(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
