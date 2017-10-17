import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/users';
import classNames from 'classnames';

/**
  Header will always be on screen.
  @param {array} : the available categories
  @param {string} : the logged in user, if any
  @param {function} : dispatch the LOG_OUT action
*/
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavBar: false
    }
  }

  render() {
    const { categories, currentUser, onClick } = this.props;
    const { showNavBar } = this.state;
    return (
      <header className="main-header">
        <div className="main-header-title">
          <h1>Readable</h1>
          <button className={classNames({
            'btn': true,
            'nav-button': true
          })}
            onClick={() => this.setState(prevState => ({showNavBar: !prevState.showNavBar}))}
          >Nav button</button>
        </div>
        <nav className={classNames({
          'nav-main': true,
          'nav-main-active': showNavBar
        })}>
          <ul className="nav-main-list">
            <li className="nav-list-item">
              <NavLink to="/" className="nav-link" activeClassName="active-link">home</NavLink>
            </li>
            <li className="nav-list-item">
              <NavLink to="/category" className="nav-link" activeClassName="active-link">all categories</NavLink>
            </li>
            {categories && categories.map(category => (
              <li key={category} className="nav-list-item">
                <NavLink to={`/category/${category}`} className="nav-link" activeClassName="active-link">{category}</NavLink>
              </li>
            ))}
            {currentUser && (
              <li className={classNames({
                'nav-list-item': true,
                'nav-list-item__logout': true
              })}>
                <button className={classNames({
                  'btn': true,
                  'logout-btn': true
                })}
                  onClick={() => onClick(currentUser)}
                >LogOut</button>
              </li>
            )}
            {!currentUser && (
              <li className="nav-list-item">
                <NavLink to="/signup" className="nav-link" activeClassName="active-link">signup</NavLink>
              </li>
            )}
            {!currentUser && (
              <li className="nav-list-item">
                <NavLink to="/login" className="nav-link" activeClassName="active-link">login</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
};

const mapStateToProps = state => ({
  categories: state.categories,
  currentUser: state.currentUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: user => dispatch(logOut(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
