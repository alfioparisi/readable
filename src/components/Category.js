import React, { Component } from 'react';
import Post from './Post';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    const { name, posts } = this.props;
    if (posts) {
      this.setState({posts});
      return;
    };
    fetch(`http://localhost:3001/${name}/posts`, {
      headers: {'Authorization': 'access-denied'}
    })
    .then(res => res.json())
    .then(posts => this.setState({posts}))
    .catch(err => {
      console.error(err);
      window.alert('Cant fetch posts for this category.')
    })
  }

  render() {
    const { posts } = this.state;
    const { name } = this.props;
    return (
      <main>
        <header>
          <h2>{name || 'All Categories'}</h2>
        </header>
        <ul>
          {posts && posts.map(post => (
            <li key={post.id}>
              <Post
                category={post.category}
                title={post.title}
                body={post.body}
                author={post.author}
                timestamp={{timeCreated: post.timestamp}}
                voteScore={post.voteScore}
              />
            </li>
          ))}
        </ul>
        <footer>
          <p>Write a new post. (this footer is gonna be fixed and always on top)</p>
        </footer>
      </main>
    );
  }
}

export default Category;
