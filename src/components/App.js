import React, { Component } from 'react';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <div>
            <button>Nav button</button>
            <h1>Readable</h1>
          </div>
          <nav>
            <ul>
              <li>Category1</li>
              <li>Category2</li>
              <li>Category3</li>
            </ul>
          </nav>
        </header>
        <main>
          <header>
            <h2>Web app for Udacity React Nanodegree</h2>
          </header>
          <p>You can either create an account or move on as 'Anonymous'</p>
          <div>
            <a href="#signup">Sign Up</a>
            <a href="#login">Log In</a>
            <a href="#allcategories">Anonymous</a>
          </div>
        </main>
        <footer>
          <nav>
            <ul>
              <li>Category1</li>
              <li>Category2</li>
              <li>Category3</li>
            </ul>
          </nav>
          <nav>
            <ul>
              <li>Home</li>
              <li>Sign Up</li>
              <li>Log In</li>
            </ul>
          </nav>
        </footer>
      </div>
    );
  }
}

export default App;
