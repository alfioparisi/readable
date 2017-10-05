import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/users';

/**
  Header will always be on screen.
  @param {array} : the available categories
  @param {string} : the logged in user, if any
  @param {function} : dispatch the LOG_OUT action
*/
const Header = ({ categories, currentUser, onClick }) => (
  <header>
    <div>
      <button>Nav button</button>
      <h1>Readable</h1>
    </div>
    <nav>
      <ul>
        <li>
          <NavLink to="/">home</NavLink>
        </li>
        <li>
          <NavLink to="/category">all categories</NavLink>
        </li>
        {categories && categories.map(category => (
          <li key={category}>
            <NavLink to={`/category/${category}`}>{category}</NavLink>
          </li>
        ))}
        {currentUser && (
          <li>
            <button
              onClick={() => onClick(currentUser)}
            >LogOut</button>
          </li>
        )}
        {!currentUser && (
          <li>
            <NavLink to="/signup">signup</NavLink>
          </li>
        )}
        {!currentUser && (
          <li>
            <NavLink to="/login">login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  </header>
);

const mapStateToProps = state => ({
  categories: state.categories,
  currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: user => dispatch(logOut(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
