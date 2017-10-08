import React from 'react';
import { Link } from 'react-router-dom';

// Component rendered on first load.
const HomePage = () => (
  <main className="home-page">
    <header>
      <h2>Web app for Udacity React Nanodegree</h2>
    </header>
    <p>You can either create an account or move on as Anonymous</p>
    <div className="links-container">
      <Link to="signup" className="home-link">Sign Up</Link>
      <Link to="login" className="home-link">Log In</Link>
      <Link to="category" className="home-link">Anonymous</Link>
    </div>
  </main>
);

export default HomePage;
