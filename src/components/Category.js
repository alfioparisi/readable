import React, { Component } from 'react';
import PostList from './PostList';
import Post from './Post';
import { Route } from 'react-router-dom';
import uuidv1 from 'uuid';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      writingPost: false,
      category: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { name, posts } = this.props;
    // Category showing all the posts doesn't receive a 'name' prop, so set 'react'
    // as default.
    if (name) this.setState({posts, category: name});
    else this.setState({posts, category: 'react'});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts) this.setState({posts: nextProps.posts});
  }

  handleChange(evt) {
    this.setState({category: evt.target.value});
  }

  render() {
    const { posts, writingPost, category } = this.state;
    const { name, currentUser, categories, onClick } = this.props;
    return (
      <main>
        <header>
          <h2>{name || 'All Categories'}</h2>
        </header>
        <Route exact path={`/category/${name || ''}`}
          render={() => <PostList posts={posts} />}
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
              />
            )}
          />
        ))}
        {writingPost && (
          <form>
            <label>Post title :
              <input ref={title => this.title = title} />
            </label>
            <label>Category :
              <select value={category} onChange={this.handleChange}>
                {categories && categories.map(c => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <textarea placeholder="Write your post here." ref={textarea => this.textarea = textarea} />
            <input type="submit" value="Post"
              onClick={evt => {
                evt.preventDefault();
                const author = currentUser ? currentUser.name : 'Anonymous';
                onClick(
                  uuidv1(),
                  category,
                  this.title.value.trim(),
                  this.textarea.value.trim(),
                  author,
                  Date.now()
                );
                this.setState({writingPost: false});
                this.textarea.value = '';
              }}
            />
          </form>
        )}
        <footer>
          <button
            onClick={() => this.setState({writingPost: true})}
          >Write a new post</button>
          <p>this footer is gonna be fixed and always on top</p>
        </footer>
      </main>
    );
  }
}

export default Category;
