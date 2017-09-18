import React, { Component } from 'react';
import Header from './Header';
import HomePage from './HomePage';
import Footer from './Footer';
import Category from './Category';
import SignUp from './SignUp';
import LogIn from './LogIn';
import { Route } from 'react-router-dom';
import store from '../store';
import { logOut } from '../actions/users';
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
    this.onLogOut = this.onLogOut.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3001/categories', {
      headers: {'Authorization': 'let-me-in-please'}
    })
    .then(res => res.json())
    .then(res => this.setState({categories: res.categories}))
    .catch(err => {
      console.error(err);
      window.alert('Impossible to connect with the server.')
    });

    this.getInitialPosts();

    const users = store.getState().users;
    this.setState({
      users: Object.keys(users).map(key => users[key])
    });
  }

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

  onLogIn(name) {
    this.setState({
      users: store.getState().users,
      currentUser: store.getState().users[name]
    });
  }

  onLogOut(name) {
    store.dispatch(logOut(name));
    this.setState({currentUser: null})
  }

  getLoggedInUsers() {
    const { users } = this.state;
    return users.filter(user => user.isLoggedIn);
  }

  filterPostsByCategory(category) {
    const { posts } = this.state;
    return posts.filter(posts => null);
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
        {categories && categories.map(category => (
          <Route key={category.name} path={`/category/${category.path}`}
            render={() => (
              <Category
                name={category.name}
                currentUser={currentUser}
                categories={categories}
                onClick={this.handleNewPost}
              />
            )}
          />
        ))}
        <Route path="/signup" render={() => (
          <SignUp onClick={this.onLogIn} />
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
