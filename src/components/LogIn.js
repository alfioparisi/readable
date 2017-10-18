import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../actions/users';
import classNames from 'classnames';

// Check if there is a user under the provided credentials.
const isUser = (users, name, password) => users.find(user => user.name === name && user.password === password);

/**
  @param {array} : the registered users
  @param {function} : log in a user
*/
const LogIn = ({ users, currentUser, onClick }) => {
  let name = null;
  let password = null;
  return (
    <section className="form-container">
      <header>
        <h3>Log into your accout</h3>
      </header>
      <form className="user-form">
        <label>Username :
          <input placeholder="AryaStark" ref={inputName => name = inputName} />
        </label>
        <label>Password :
          <input type="password" ref={inputPassword => password = inputPassword} />
        </label>
      </form>
      <div className="btn-container">
        <button className={classNames({
          'btn': true,
          'login-btn': true
        })}
          onClick={() => {
            if (isUser(users, name.value.trim(), password.value.trim())) {
              window.alert(`Successfully looged in as ${name.value}.`);
              onClick(name.value.trim(), password.value.trim());
            } else window.alert('No user found under those credentials.');
            name.value = '';
            password.value = '';
          }}
          disabled={currentUser}
        >
          LogIn
        </button>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  users: Object.keys(state.users).map(name => state.users[name]),
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClick: (name, pass) => dispatch(logIn(name, pass))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
