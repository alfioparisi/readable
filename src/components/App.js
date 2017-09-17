import React, { Component } from 'react';
import Header from './Header';
import HomePage from './HomePage';
import Footer from './Footer';
import Category from './Category';
import SignUp from './SignUp';
import LogIn from './LogIn';
import { Route } from 'react-router-dom';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={HomePage} />
        <Route path="/category" component={Category} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Footer />
      </div>
    );
  }
}

export default App;
