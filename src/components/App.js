import React, { Component } from 'react';
import Header from './Header';
import HomePage from './HomePage';
import Footer from './Footer';
import Category from './Category';
import SignUp from './SignUp';
import LogIn from './LogIn';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategoriesFromServer } from '../actions/categories';
import { addInitialUser, createInitialUsers } from '../actions/users';
import { getInitialPosts } from '../actions/posts';
import '../css/App.css';

/**
  @param {array} : the available categories
  @param {function} : get `categories` from the server
  @param {function} : add users to Redux
  @param {function} : add posts to Redux
*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'byVoteDec'
    };
    this.addUserToStorage = this.addUserToStorage.bind(this);
  }

  /**
    Populate Redux state with data already on the server. Also set up localStorage
    to hold the `users` object.
  */
  componentDidMount() {
    const { getCategories, onUserAdd, createInitialUsers, getInitialPosts } = this.props;

    // Fetch categories from the server.
    getCategories();

    // If there is the 'user' object in the localStorage, populate the Redux state
    // off of it.
    if (localStorage.getItem('users')) {
      const users = JSON.parse(localStorage.getItem('users'));
      const usersArray = Object.keys(users).map(name => users[name]);
      usersArray.forEach(user => onUserAdd(user.name, user.password, user.dateCreated));
    // If not, create the 'users' object by fetching the initial posts from the server.
    } else {
      createInitialUsers();
    }
    // Fetch initial posts from the server.
    getInitialPosts();
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

  /*
    Why pass `location` to Header?
    https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
  */
  render() {
    const { categories, location } = this.props;
    return (
      <div>
        <Header location={location} />
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
  getCategories: () => dispatch(getCategoriesFromServer()),
  onUserAdd: (name, pass, dateCreated) => dispatch(addInitialUser(name, pass, dateCreated)),
  createInitialUsers: () => dispatch(createInitialUsers()),
  getInitialPosts: () => dispatch(getInitialPosts())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

// https://github.com/ReactTraining/react-router/issues/4671
