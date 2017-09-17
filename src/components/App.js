import React, { Component } from 'react';
import Header from './Header';
import HomePage from './HomePage';
import Footer from './Footer';
import Category from './Category';
import SignUp from './SignUp';
import LogIn from './LogIn';
import { Route } from 'react-router-dom';
import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      posts: []
    };
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

    fetch('http://localhost:3001/posts', {
      headers: {'Authorization': 'let-me-in-please'}
    })
    .then(res => res.json())
    .then(posts => this.setState({posts}))
    .catch(err => {
      console.error(err);
      window.alert('Impossible to connect with the server.')
    });
  }

  render() {
    const { categories, posts } = this.state;
    return (
      <div>
        <Header
          categories={categories}
        />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/category"
          render={() => <Category posts={posts} />}
        />
        {categories && categories.map(category => (
          <Route key={category.name} path={`/category/${category.path}`}
            render={() => <Category name={category.name} />}
          />
        ))}
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Footer />
      </div>
    );
  }
}

export default App;
