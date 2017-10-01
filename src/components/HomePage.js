import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <main>
    <header>
      <h2>Web app for Udacity React Nanodegree</h2>
    </header>
    <p>You can either create an account or move on as 'Anonymous'</p>
    <div>
      <Link to="signup">Sign Up</Link>
      <Link to="login">Log In</Link>
      <Link to="category">Anonymous</Link>
    </div>
  </main>
);

export default HomePage;
