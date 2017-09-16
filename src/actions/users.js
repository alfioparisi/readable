export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const signUp = (name, dateCreated) => ({
  type: SIGN_UP,
  name,
  dateCreated
});

export const logIn = name => ({
  type: LOG_IN,
  name
});

export const logOut = name => ({
  type: LOG_OUT,
  name
});
