import React from 'react';
import store from '../store';
import { signUp } from '../actions/users';

const SignUp = ({ onClick }) => {
  let name = null;
  let password = null;
  return (
    <form>
      <label>Username :
        <input placeholder="JonSnow" ref={inputName => name = inputName} />
      </label>
      <label>Password :
        <input type="password" ref={inputPassword => password = inputPassword} />
      </label>
      <input type="submit" value="SignUp"
        onClick={evt => {
          const username = name.value.trim();
          const pass = password.value.trim();
          evt.preventDefault();
          store.dispatch(signUp(username, pass, Date.now()));
          onClick(username);
          name.value = '';
          password.value  = '';
        }}
      />
    </form>
  );
};

export default SignUp;
