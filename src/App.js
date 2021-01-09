import React from "react";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { firebaseApp } from "./Components/Firebase/firebase";

import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import ExternalUser from "./Components/ExternalUser/ExternalUser";
import Dashboard from "./Components/Dashboard/Dashboard";
import LandingPage from './Components/LandingPage/LandingPage';

class App extends React.Component {
  state = { authenticated: false, user: null };

  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        });
      }
    });
  }

  render() {
    const { authenticated } = this.state;

    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path='/react-gh-pages' component={LandingPage} />
            <PrivateRoute 
              exact path='/externaluser' 
              component={ExternalUser} 
              authenticated={authenticated} 
            />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
              authenticated={authenticated}
            />     
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;