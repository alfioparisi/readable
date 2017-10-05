import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

/**
  @param {array} : the available categories
  @param {string} : the logged in user, if any
*/
const Footer = ({ categories, currentUser }) => (
  <footer>
    <nav>
      <ul>
        <li>
          <NavLink to={'/category'}>all categories</NavLink>
        </li>
        {categories && categories.map(category => (
          <li key={category}>
            <NavLink to={`/category/${category}`}>{category}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
    <nav>
      <ul>
        <li>
          <NavLink to={'/'}>home</NavLink>
        </li>
        {!currentUser && (
          <li>
            <NavLink to={'/signup'}>signup</NavLink>
          </li>
        )}
        {!currentUser && (
          <li>
            <NavLink to={'/login'}>login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  </footer>
);

const mapStateToProps = state => ({
  categories: state.categories,
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(Footer);
