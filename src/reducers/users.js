import { SIGN_UP, LOG_IN, LOG_OUT } from '../actions/users';
import { ADD_POST, EDIT_POST } from '../actions/posts';
import { ADD_COMMENT, EDIT_COMMENT } from '../actions/comments';

/**
  Handle the single user.
*/
const user = (state = {}, action) => {
  switch(action.type) {
    case SIGN_UP :
      return {
        name: action.name,
        password: action.password,
        dateCreated: action.dateCreated,
        posts: [],
        comments: [],
        isLoggedIn: true
      };
    case LOG_IN :
      return {...state, isLoggedIn: true};
    case LOG_OUT :
      return {...state, isLoggedIn: false};
    case ADD_POST :
      return {...state, posts: [...state['posts'], action.id]};
    case EDIT_POST :
      return {...state, posts: [...state['posts'], action.id]};
    case ADD_COMMENT :
      return {...state, comments: [...state['comments'], action.id]};
    case EDIT_COMMENT :
      return {...state, comments: [...state['comments'], action.id]};
    default :
      return state;
  }
};

/**
  Manage the `users` branch of the state tree.
*/
const initialState = {
  Anonymous: {
    name: 'Anonymous',
    password: null,
    dateCreated: null,
    posts: [],
    comments: [],
    isLoggedIn: false
  }
};

const getInitialState = () => fetch('http://localhost:3001/posts', {
  headers: {
    'Authorization': 'let-me-in-please',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(posts => posts.forEach(post => {
  initialState[post.author] = {
    name: post.author,
    password: null,
    dateCreated: null,
    posts: [],
    comments: [],
    isLoggedIn: false
  };
}))
.catch(err => console.error(err));

getInitialState();

const users = (state = initialState, action) => {
  switch(action.type) {
    case SIGN_UP :
      return {...state, [action.name]: user(undefined, action)};
    case LOG_IN :
      return {...state, [action.name]: user(state[action.name], action)};
    case LOG_OUT :
      return {...state, [action.name]: user(state[action.name], action)};
    case ADD_POST :
      return {...state, [action.author]: user(state[action.author], action)};
    case ADD_COMMENT :
      return {...state, [action.author]: user(state[action.author], action)};
    case EDIT_POST :
      return {...state, [action.author]: user(state[action.author], action)};
    case EDIT_COMMENT :
      return {...state, [action.author]: user(state[action.author], action)};
    default :
      return state;
  }
};

export default users;
