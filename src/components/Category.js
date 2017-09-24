import React, { Component } from 'react';
import PostList from './PostList';
import Post from './Post';
import PostingForm from './PostingForm';
import { Route } from 'react-router-dom';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      writingPost: false,
      viewingPost: false,
      category: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { name, posts } = this.props;
    // Category showing all the posts doesn't receive a 'name' prop, so set 'react'
    // as default.
    this.setState({posts, category: name || 'react'});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts) this.setState({posts: nextProps.posts});
  }

  handleChange(category) {
    this.setState({category});
  }

  render() {
    const { posts, writingPost, viewingPost, category } = this.state;
    const { name, currentUser, categories, onClick } = this.props;
    return (
      <main>
        <header>
          <h2>{name || 'All Categories'}</h2>
        </header>
        <Route exact path={`/category/${name || ''}`}
          render={() => <PostList
            posts={posts}
            isViewingPost={bool => this.setState({viewingPost: bool})}
            viewingPost={viewingPost}
            currentUser={currentUser}
          />}
        />
        {posts && posts.map(post => (
          <Route key={post.id} path={`/category/${post.category}/${post.id}`}
            render={() => (
              <Post
                id={post.id}
                category={post.category}
                title={post.title}
                body={post.body}
                author={post.author}
                timestamp={{timeCreated: post.timestamp}}
                voteScore={post.voteScore}
                showComments={true}
                isViewingPost={bool => this.setState({viewingPost: bool})}
                viewingPost={viewingPost}
                currentUser={currentUser}
              />
            )}
          />
        ))}
        {writingPost && (
          <PostingForm
            category={category}
            categories={categories}
            currentUser={currentUser}
            onChange={this.handleChange}
            onClick={(id, category, title, body, author, timeCreated) => {
              onClick(id, category, title, body, author, timeCreated);
              this.setState({writingPost: false})
            }}
          />
        )}
        {!viewingPost && (
          <footer>
            <button
              onClick={() => this.setState({writingPost: true})}
            >Write a new post</button>
            <p>this footer is gonna be fixed and always on top</p>
          </footer>
        )}
      </main>
    );
  }
}

export default Category;
