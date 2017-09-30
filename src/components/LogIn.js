import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions/users';

const isUser = (users, name, password) => users.find(user => user.name === name && user.password === password);

const LogIn = ({ users, onClick }) => {
  let name = null;
  let password = null;
  return (
    <form>
      <label>Username :
        <input placeholder="AryaStark" ref={inputName => name = inputName} />
      </label>
      <label>Password :
        <input type="password" ref={inputPassword => password = inputPassword} />
      </label>
      <input type="submit" value="LogIn"
        onClick={evt => {
          evt.preventDefault();
          if (isUser(users, name.value.trim(), password.value.trim())) {
            onClick(name.value.trim(), password.value.trim());
          } else window.alert('No user found under those credentials.');
          name.value = '';
          password.value = '';
        }}
      />
    </form>
  );
};

const mapStateToProps = state => ({
  users: Object.keys(state.users).map(name => state.users[name])
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (name, pass) => {
    dispatch(logIn(name, pass));
    ownProps.onClick(name);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
