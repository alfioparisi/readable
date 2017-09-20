export const ADD_INITIAL_USER = 'ADD_INITIAL_USER';
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const addInitialUser = (name, password = null, dateCreated = null) => ({
  type: ADD_INITIAL_USER,
  name,
  password,
  dateCreated
});

export const signUp = (name, password, dateCreated) => ({
  type: SIGN_UP,
  name,
  password,
  dateCreated
});

export const logIn = (name, password) => ({
  type: LOG_IN,
  name,
  password
});

export const logOut = name => ({
  type: LOG_OUT,
  name
});
