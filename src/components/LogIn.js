import React from 'react';
import store from '../store';

const isUser = (users, name, password) => Object.keys(users).find(key => users[key].name === name && users[key].password === password);

const LogIn = ({ onClick }) => {
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
          if (isUser(store.getState().users, name.value.trim(), password.value.trim())) {
            onClick(name.value.trim(), password.value.trim());
          } else window.alert('No user found under those credentials.');
          name.value = '';
          password.value = '';
        }}
      />
    </form>
  );
};

export default LogIn;
