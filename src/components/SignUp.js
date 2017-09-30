import React from 'react';

const SignUp = ({ onClick }) => {
  let name = null;
  let password = null;
  return (
    <form>
      <label>Username :
        <input autoFocus placeholder="JonSnow" ref={inputName => name = inputName} />
      </label>
      <label>Password :
        <input type="password" ref={inputPassword => password = inputPassword} />
      </label>
      <input type="submit" value="SignUp"
        onClick={evt => {
          evt.preventDefault();
          const username = name.value.trim();
          const pass = password.value.trim();
          onClick(username, pass, Date.now());
          name.value = '';
          password.value  = '';
        }}
      />
    </form>
  );
};

export default SignUp;
