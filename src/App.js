import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}  from 'react-router-dom';

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
        <Navbar/>
        <Switch>
        <Route exact path="/">
          <div style={{position: 'absolute', marginLeft: '50px'}}>
          <Collections />
          </div>
        </Route>
        <Route exact path="/borrowed">
          <Borrowed />
        </Route>
      </Switch>
      </Router>
    );
  }
}

export default App;
