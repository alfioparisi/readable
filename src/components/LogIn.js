import React from 'react';

const LogIn = () => (
  <form>
    <label>Username :
      <input placeholder="AryaStark" />
    </label>
    <label>Password :
      <input type="password" />
    </label>
    <input type="submit" value="LogIn"
      onClick={evt => {
        evt.preventDefault();
        console.log('dispatch LOG_IN');
      }}
    />
  </form>
);

export default LogIn;
