import { Link } from 'react-router-dom';
import React from 'react';
import firebase from 'firebase';

class Signup extends React.Component {

  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      signupError: ''
    };
  }

  render() {
    return (
        <form className="form" onSubmit={(e) => this.submitSignup(e)}>
            <h1 className='sign'>Sign Up</h1>
            <label>Email</label>
            <input
                type="email"
                placeholder="email"
                value={this.state.email}
                onChange={(e) => this.userTyping('email', e)}
            />

            <label>Password</label>
            <input
                placeholder="password"
                type="password"
                value={this.state.password}
                onChange={(e) => this.userTyping('password', e)}
            />

            <label>Confirm Password</label>
            <input
                placeholder="confirm password"
                type="password"
                value={this.state.confirmPassword}
                onChange={(e) => this.userTyping('passwordConfirmation', e)}
            />

            <button
                type="submit"
                style={{ background: " rgb(2, 2, 110)" }}
            >
                Sign Up
            </button>

            { 
            this.state.signupError ? 
            <h5>
                {this.state.signupError}
            </h5> :
            null
            }
            <h5>Already Have An Account?</h5>
            <Link to='/login'>Log In Here</Link>
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

      case 'passwordConfirmation':
        this.setState({ passwordConfirmation: event.target.value });
        break;

      default:
        break;
    }
  }

  formIsValid = () => this.state.password === this.state.passwordConfirmation;

  submitSignup = (e) => {
    e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit.

    if(!this.formIsValid()) {
      this.setState({ signupError: 'Passwords do not match' });
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(authRes => {
          const userObj = {
          email: authRes.user.email,
          friends: [],
          messages: []
          };
          firebase
          .firestore()
          .collection('admin')
          .doc(this.state.email)
          .set(userObj)
          .then(() => {
              this.props.history.push('/dashboard');
          }, dbErr => {
          console.log('Failed to add user to the database: ', dbErr);
          this.setState({ signupError: 'Failed to add user' });
          });
      }, authErr => {
      console.log('Failed to create user: ', authErr);
      this.setState({ signupError: `Failed to add user: ${authErr.message}` });
    });
    
  };
}

export default Signup;