import React from 'react';

const SignUp = () => (
  <form>
    <label>Username :
      <input placeholder="JonSnow" />
    </label>
    <label>Password :
      <input type="password" />
    </label>
    <input type="submit" value="SignUp"
      onClick={evt => {
        evt.preventDefault();
        console.log('dispatch SIGN_UP');
      }}
    />
  </form>
);

export default SignUp;
