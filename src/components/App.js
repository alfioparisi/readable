import React, { Component } from 'react';
import Header from './Header';
import HomePage from './HomePage';
import Footer from './Footer';
import Category from './Category';
import SignUp from './SignUp';
import LogIn from './LogIn';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import { getCategoriesFromServer } from '../actions/categories';
import { addInitialUser } from '../actions/users';
import { addPost } from '../actions/posts';
import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'byVoteDec'
    };
    this.getInitialPosts = this.getInitialPosts.bind(this);
    this.addUserToStorage = this.addUserToStorage.bind(this);
  }

  componentDidMount() {
    store.dispatch(getCategoriesFromServer())

    // If there is the 'user' object in the localStorage, populate the Redux state
    // and this state off of it.
    if (localStorage.getItem('users')) {
      const users = JSON.parse(localStorage.getItem('users'));
      const usersArray = Object.keys(users).map(name => users[name]);
      usersArray.forEach(user => store.dispatch(addInitialUser(user.name, user.password, user.dateCreated)));
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
        post.comments = [];
      });
    })
    .catch(err => console.error(err));
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

  render() {
    const { categories } = this.props;
    return (
      <div>
        <Header />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/category" component={Category} />
        {categories && categories.map(category => (
            <Route key={category} path={`/category/${category}`}
              render={() => (
                <Category
                  name={category}
                />
              )}
            />
          )
        )}
        <Route path="/signup" render={() => (
          <SignUp onClick={(name, pass, dateCreated) => this.addUserToStorage(name, pass, dateCreated)} />
        )} />
        <Route path="/login" component={LogIn} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

// https://github.com/ReactTraining/react-router/issues/4671
