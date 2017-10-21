export const ADD_INITIAL_USER = 'ADD_INITIAL_USER';
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const addInitialUser = (name, password = null, dateCreated = null, posts = []) => ({
  type: ADD_INITIAL_USER,
  name,
  password,
  dateCreated,
  posts
});

export const createInitialUsers = () => dispatch => {
  // Make the 'Anonymous' user.
  const users = {
    Anonymous: {
      name: 'Anonymous',
      password: null,
      dateCreated: null,
      posts: [],
      comments: [],
      isLoggedIn: false
    }
  };
  // Fetch initial posts from the server.
  fetch('http://localhost:3001/posts', {
    headers: {
      'Authorization': 'let-me-in-please',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  // For each post make a new user.
  .then(posts => posts.forEach(post => {
    if (users[post.author]) {
      users[post.author].posts.push(post.id);
    } else {
      users[post.author] = {
        name: post.author,
        password: null,
        dateCreated: null,
        posts: [post.id],
        comments: [],
        isLoggedIn: false
      };
    }
  }))
  // Finally save the `users` object on the localStorage, dispatch actions to
  // add users to Redux.
  .then(() => {
    localStorage.setItem('users', JSON.stringify(users));
    const usersArray = Object.keys(users).map(name => users[name]);
    usersArray.forEach(user => {
      const { name, password, dateCreated, posts } = user;
      dispatch(addInitialUser(name, password, dateCreated, posts));
    });
  })
  .catch(err => console.error(err));
};

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
