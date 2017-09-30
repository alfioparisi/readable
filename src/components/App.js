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
import { addPostOnServer, addPost, editPostOnServer, deletePostOnServer, votePostOnServer } from '../actions/posts';
import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      posts: [],
      users: [],
      currentUser: null,
      filter: 'byVoteDec'
    };
    this.getInitialPosts = this.getInitialPosts.bind(this);
    this.getLoggedInUsers = this.getLoggedInUsers.bind(this);
    this.onLogIn = this.onLogIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.addUserToStorage = this.addUserToStorage.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
    this.onPostEdit = this.onPostEdit.bind(this);
    this.onPostDelete = this.onPostDelete.bind(this);
    this.onPostVote = this.onPostVote.bind(this);
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
      posts.forEach(post => {
        const { id, category, title, body, author, timestamp, voteScore } = post;
        store.dispatch(addPost(id, category, title, body, author, timestamp, voteScore));
      });
      const notDeletedPosts = posts.filter(post => !post.deleted);
      this.setState({posts: notDeletedPosts});
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
    const user = store.getState().users[username];
    this.setState(prevState => ({
      users: [...prevState.users, user],
      currentUser: user
    }));
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
    // Can chain '.then()' because we return the 'fetch()' call from 'addPostOnServer()'.
    store.dispatch(addPostOnServer(id, category, title, body, author, timeCreated))
    .then(res => res.json())
    .then(post => this.setState(prevState => ({
      posts: [...prevState.posts, post]
    })));
  }

  onPostEdit(id, body, timeEdited) {
    const { currentUser } = this.state;
    const author = currentUser ? currentUser.name : 'Anonymous';
    store.dispatch(editPostOnServer(id, body, author, timeEdited))
    .then(post => this.setState(prevState => ({
      posts: [...prevState.posts.filter(post => post.id !== id), post]
    })))
    .catch(err => {
      console.error(err);
      window.alert('Couldnt edit the post correctly.');
    })
  }

  onPostDelete(id, timeDeleted) {
    store.dispatch(deletePostOnServer(id, timeDeleted))
    .then(() => this.setState(prevState => ({
      posts: prevState.posts.filter(post => post.id !== id)
    })))
    .catch(err => {
      console.error(err);
      window.alert('Couldnt delete the post correctly.');
    });
  }

  onPostVote(id, upvote) {
    store.dispatch(votePostOnServer(id, upvote))
    .then(post => this.setState(prevState => ({
      posts: [...prevState.posts.filter(p => p.id !== post.id), post]
    })))
    .catch(err => {
      console.error(err);
      window.alert('Couldnt vote the post.');
    });
  }

  render() {
    const { categories, currentUser, posts, users } = this.state;
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
              onPostEdit={this.onPostEdit}
              onPostDelete={this.onPostDelete}
              onPostVote={this.onPostVote}
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
                  onPostEdit={this.onPostEdit}
                  onPostDelete={this.onPostDelete}
                  onPostVote={this.onPostVote}
                />
              )}
            />
          );
        })}
        <Route path="/signup" render={() => (
          <SignUp onClick={this.onSignUp} />
        )} />
        <Route path="/login" render={() => (
          <LogIn onClick={this.onLogIn} users={users} />
        )} />
        <Footer />
      </div>
    );
  }
}

export default App;

/*
  TODO:
  * edit post and comment
  * delete them
*/
