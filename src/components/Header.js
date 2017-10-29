import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import { NavLink } from 'react-router-dom';
import { changeDrawerState } from '../actions/drawer';
import { logOut } from '../actions/users';
import { connect } from 'react-redux';

let Logged = ({ currentUser, dispatch }) => (
  <FlatButton
    label="LogOut"
    onClick={() => dispatch(logOut(currentUser))}
  />
);

const mapStateToLoggedProps = state => ({
  currentUser: state.currentUser
});

Logged = connect(mapStateToLoggedProps)(Logged);

let NotLogged = props => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem>
      <NavLink to="/signup">SignUp</NavLink>
    </MenuItem>
    <MenuItem>
      <NavLink to="/login">LogIn</NavLink>
    </MenuItem>
    <MenuItem>
      <NavLink to="/category">Anonymous</NavLink>
    </MenuItem>
  </IconMenu>
);

NotLogged.muiName = 'IconMenu';

/**
  Header will always be on screen.
  @param {boolean} : show the drawer
  @param {string} : the logged in user, if any
  @param {function} : dispatch the LOG_OUT action
*/
const Header = ({ open, currentUser, changeDrawerState }) => (
  <AppBar
    title={<NavLink to="/">Readable</NavLink>}
    iconElementRight={currentUser ? <Logged /> : <NotLogged />}
    onLeftIconButtonTouchTap={() => changeDrawerState(!open)}
  />
);

const mapStateToProps = state => ({
  open: state.drawer,
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  changeDrawerState: open => dispatch(changeDrawerState(open))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
