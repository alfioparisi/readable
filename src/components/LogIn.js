import React from 'react';

const isUser = (users, name, password) => users.find(user => user.name === name && user.password === password);

const LogIn = ({ onClick, users }) => {
  let name = null;
  let password = null;
  return (
    <form>
      <label>Username :
        <input autoFocus placeholder="AryaStark" ref={inputName => name = inputName} />
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

export default LogIn;
