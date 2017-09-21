import React, { Component } from 'react';
import Header from './Header';
import HomePage from './HomePage';
import Footer from './Footer';
import Category from './Category';
import SignUp from './SignUp';
import LogIn from './LogIn';
import { Route } from 'react-router-dom';
import store from '../store';
import { addInitialUser, signUp, logIn, logOut } from '../actions/users';
import { addPostOnServer, addPost } from '../actions/posts';
import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      posts: [],
      users: [],
      currentUser: null
    };
    this.getInitialPosts = this.getInitialPosts.bind(this);
    this.getLoggedInUsers = this.getLoggedInUsers.bind(this);
    this.onLogIn = this.onLogIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.addUserToStorage = this.addUserToStorage.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
  }

  componentDidMount() {
    // Fetch the categories and save them in this state.
    fetch('http://localhost:3001/categories', {
      headers: {'Authorization': 'let-me-in-please'}
    })
    .then(res => res.json())
    .then(res => this.setState({categories: res.categories}))
    .catch(err => {
      console.error(err);
      window.alert('Impossible to connect with the server.')
    });

    // If there is the 'user' object in the localStorage, populate the Redux state
    // and this state off of it.
    if (localStorage.getItem('users')) {
      const users = JSON.parse(localStorage.getItem('users'));
      const usersArray = Object.keys(users).map(name => users[name]);
      usersArray.forEach(user => store.dispatch(addInitialUser(user.name, user.password, user.dateCreated)));
      this.setState({
        users: usersArray
      });
    // If not, create the 'users' object by fetching the initial users from the server.
    } else {
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
        users[post.author] = {
          name: post.author,
          password: null,
          dateCreated: null,
          posts: [],
          comments: [],
          isLoggedIn: false
        };
      }))
      // Finally save the 'users' object on the localStorage, dispatch actions to
      // add users to Redux, and set this state to be the array version of 'users'.
      .then(() => {
        localStorage.setItem('users', JSON.stringify(users));
        const usersArray = Object.keys(users).map(name => users[name]);
        usersArray.forEach(user => store.dispatch(addInitialUser(user.name, user.password, user.dateCreated)));
        this.setState({
          users: usersArray
        });
      })
      .catch(err => console.error(err));
    }

    // Fetch initial posts from the server.
    this.getInitialPosts();
  }

  // Fetch posts from the server and add them to Redux.
  getInitialPosts() {
    fetch('http://localhost:3001/posts', {
      headers: {
        'Authorization': 'let-me-in-please',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(posts => {
      posts.forEach(post => store.dispatch(addPost(post.id, post.category, post.title, post.body, post.author, post.timestamp)));
      this.setState({posts});
    })
    .catch(err => console.error(err));
  }

  // On log in update Redux and this state. Set the 'currentUser'.
  onLogIn(name, password) {
    store.dispatch(logIn(name, password));
    const users = store.getState().users;
    const usersArray = Object.keys(users).map(name => users[name]);
    this.setState({
      users: usersArray,
      currentUser: store.getState().users[name]
    });
  }

  // Get the 'users' object from localStorage and update it with the new user.
  addUserToStorage(name, password, dateCreated) {
    const users = JSON.parse(localStorage.getItem('users'));
    users[name] = {
      name,
      password,
      dateCreated,
      posts: [],
      comments: []
    };
    localStorage.setItem('users', JSON.stringify(users));
  }

  // Update Redux, localStorage and this state.
  onSignUp(username, password, dateCreated) {
    this.addUserToStorage(username, password, dateCreated);
    store.dispatch(signUp(username, password, dateCreated));
    const users = store.getState().users;
    const usersArray = Object.keys(users).map(name => users[name]);
    this.setState({
      users: usersArray,
      currentUser: store.getState().users[username]
    });
  }

  onLogOut(name) {
    store.dispatch(logOut(name));
    const users = store.getState().users;
    const usersArray = Object.keys(users).map(name => users[name]);
    this.setState({
      users: usersArray,
      currentUser: null
    });
  }

  getLoggedInUsers() {
    const { users } = this.state;
    return users.filter(user => user.isLoggedIn);
  }

  filterPostsByCategory(category) {
    const { posts } = this.state;
    return posts.filter(post => post.category === category);
  }

  handleNewPost(id, category, title, body, author, timeCreated) {
    store.dispatch(addPostOnServer(id, category, title, body, author, timeCreated));
    // find a way to wait for the dispatch and then update the state.
    fetch(`http://localhost:3001/posts/${id}`, {
      headers: {
        'Authorization': 'let-me-in-please',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(post => this.setState(prevState => ({
      posts: [...prevState.posts, post]
    })))
    .catch(err => console.error(err));
  }

  render() {
    const { categories, posts, currentUser } = this.state;
    return (
      <div>
        <Header
          categories={categories}
          currentUser={currentUser}
          onClick={this.onLogOut}
        />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/category"
          render={() => (
            <Category
              posts={posts}
              currentUser={currentUser}
              categories={categories}
              onClick={this.handleNewPost}
            />
          )}
        />
        {categories && categories.map(category => {
          const categoryPosts = this.filterPostsByCategory(category.name);
          return (
            <Route key={category.name} path={`/category/${category.path}`}
              render={() => (
                <Category
                  name={category.name}
                  posts={categoryPosts}
                  currentUser={currentUser}
                  categories={categories}
                  onClick={this.handleNewPost}
                />
              )}
            />
          );
        })}
        <Route path="/signup" render={() => (
          <SignUp onClick={this.onSignUp} />
        )} />
        <Route path="/login" render={() => (
          <LogIn onClick={this.onLogIn} />
        )} />
        <Footer />
      </div>
    );
  }
}

export default App;

/**
  TODO:
  * pass filtered posts from App to Category    V
  * use posts props within Category
*/
