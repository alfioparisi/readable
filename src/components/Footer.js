import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

/**
  @param {array} : the available categories
  @param {string} : the logged in user, if any
*/
const Footer = ({ categories, currentUser }) => (
  <footer className="main-footer">
    <nav className="footer-nav">
      <ul>
        <li className="nav-list-item">
          <NavLink to={'/'} className="nav-link">home</NavLink>
        </li>
        {!currentUser && (
          <li className="nav-list-item">
            <NavLink to={'/signup'} className="nav-link">signup</NavLink>
          </li>
        )}
        {!currentUser && (
          <li className="nav-list-item">
            <NavLink to={'/login'} className="nav-link">login</NavLink>
          </li>
        )}
      </ul>
    </nav>
    <nav className="footer-nav">
      <ul>
        <li className="nav-list-item">
          <NavLink to={'/category'} className="nav-link">all categories</NavLink>
        </li>
        {categories && categories.map(category => (
          <li key={category} className="nav-list-item">
            <NavLink to={`/category/${category}`} className="nav-link">{category}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </footer>
);

const mapStateToProps = state => ({
  categories: state.categories,
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(Footer);
