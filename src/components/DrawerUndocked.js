import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeDrawerState } from '../actions/drawer';
import { logOut } from '../actions/users';
import classNames from 'classnames';

const DrawerUndocked = ({ open, categories, currentUser, changeDrawerState, onClick }) => (
  <Drawer
    docked={false}
    width={200}
    open={open}
    onRequestChange={open => changeDrawerState(open)}
  >
  <nav>
    <ul className="nav-main-list">
      <MenuItem>
        <li className="nav-list-item">
          <NavLink to="/" className="nav-link" activeClassName="active-link">home</NavLink>
        </li>
      </MenuItem>
        <li className="nav-list-item">
          <NavLink to="/category" className="nav-link" activeClassName="active-link">all categories</NavLink>
        </li>
      {categories && categories.map(category => (
        <MenuItem key={category}>
          <li className="nav-list-item">
            <NavLink to={`/category/${category}`} className="nav-link" activeClassName="active-link">{category}</NavLink>
          </li>
        </MenuItem>
      ))}
      {currentUser && (
        <MenuItem>
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
        </MenuItem>
      )}
      {!currentUser && (
        <MenuItem>
          <li className="nav-list-item">
            <NavLink to="/signup" className="nav-link" activeClassName="active-link">signup</NavLink>
          </li>
        </MenuItem>
      )}
      {!currentUser && (
        <MenuItem>
          <li className="nav-list-item">
            <NavLink to="/login" className="nav-link" activeClassName="active-link">login</NavLink>
          </li>
        </MenuItem>
      )}
    </ul>
  </nav>
  </Drawer>
);

const mapStateToProps = state => ({
  open: state.drawer,
  categories: state.categories,
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  changeDrawerState: open => dispatch(changeDrawerState(open)),
  onClick: user => dispatch(logOut(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerUndocked);
