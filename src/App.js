import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import './App.css';
import Appbar from './Layout/Appbar'
import Navbar from './Layout/Navbar'
import Collections from './Collections/Collections'
import Borrowed from './Borrowed/Borrowed'

class App extends Component {

  render() {
    return (
      <Router>
        <Appbar />
        <Navbar />
        <Switch>
          <Route path="/collection">
            <div style={{ position: 'absolute', marginLeft: '50px', width: 'calc(100vw - 90px)' }}>
              <Collections />
            </div>
          </Route>
          <Route path="/borrowed">
            <div style={{ position: 'absolute', marginLeft: '50px', width: 'calc(100vw - 90px)' }}>
              <Borrowed />
            </div>
          </Route>
          <Route exact path="/">
            <Redirect to="/collection" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
