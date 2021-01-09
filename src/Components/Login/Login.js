import { Link } from 'react-router-dom';
import React from 'react';
import '../../App.css';
import firebase from 'firebase';

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      serverError: false
    };
  }

  render() {

    return (
        <form className="form" onSubmit={(e) => this.submitLogin(e)}>
            <h1 className='sign'>Sign In</h1>
            <label>Enter your Email</label>
            <input
                type="email"
                placeholder="email"
                value={this.state.email}
                onChange={(e) => this.userTyping('email', e)}
            />

            <label>Enter your Password</label>
            <input
                placeholder="password"
                type="password"
                value={this.state.password}
                onChange={(e) => this.userTyping('password', e)}
            />

            <button
                type="submit"
                style={{ background: " rgb(2, 2, 110)" }}
            >
                Sign In
            </button>

            { this.state.serverError ? 
                <h5>
                    Incorrect Login Information
                </h5> :
                null
            }
            <h5>Don't Have An Account?</h5>
            <Link to='/signup'>Sign Up Here</Link>
        </form>
    );
  }

  userTyping = (whichInput, event) => {
    switch (whichInput) {
      case 'email':
        this.setState({ email: event.target.value });
        break;

      case 'password':
        this.setState({ password: event.target.value });
        break;

      default:
        break;
    }
  }

  submitLogin = async (e) => {
    e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit.

    await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push('/dashboard');
      }, err => {
        this.setState({ serverError: true });
        console.log('Error logging in: ', err);
      });
  };

}

export default Login;