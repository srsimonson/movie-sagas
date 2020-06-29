import React, { Component } from 'react';
import './App.css';
import Home from '../Home/Home';
import Details from '../Details/Details';
import Edit from '../Edit/Edit';
import { HashRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>

          {/* ROUTES TO COMPONENTS */}
          <Route exact path='/' component={Home}/>
          <Route exact path='/Details' component={Details}/>
          <Route exact path='/Edit' component={Edit}/>

        </Router>
      </div>
    );
  }
}

export default App;
