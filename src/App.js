import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home.jsx';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import JSZip from 'jszip';
import SignUp from "./components/signup.component";
import NavBar from "./components/NavBar";
function App() {
  return (<Router>


      <div className="auth-wrapper">
        {/* <NavBar/> */}
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
