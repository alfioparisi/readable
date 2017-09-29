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
      category: '',
      filter: 'byVoteDec'
    };
    this.handleChange = this.handleChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
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

  applyFilter() {
    const { filter, posts } = this.state;
    switch(filter) {
      case 'byVoteDec' :
        return posts.sort((a, b) => b.voteScore - a.voteScore);
      case 'byVoteCre' :
        return posts.sort((a, b) => a.voteScore - b.voteScore);
      case 'byDateNew' :
        return posts.sort((a, b) => b.timestamp - a.timestamp);
      case 'byDateOld' :
        return posts.sort((a, b) => a.timestamp - b.timestamp);
      default :
        window.alert('Invalid filter');
        return posts;
    }
  }

  render() {
    const { writingPost, viewingPost, category, filter } = this.state;
    const { name, currentUser, categories, onClick, onPostEdit, onPostDelete, onPostVote } = this.props;
    const posts = this.applyFilter();
    return (
      <main>
        <header>
          <h2>{name || 'All Categories'}</h2>
          <label>Filter by:
            <select value={filter} onChange={evt => this.setState({filter: evt.target.value})}>
              <option value='byVoteDec'>More Likes</option>
              <option value='byVoteCre'>Less Likes</option>
              <option value='byDateNew'>Newest</option>
              <option value='byDateOld'>Oldest</option>
            </select>
          </label>
        </header>
        <Route exact path={`/category/${name || ''}`}
          render={() => <PostList
            posts={posts}
            isViewingPost={bool => this.setState({viewingPost: bool})}
            viewingPost={viewingPost}
            currentUser={currentUser}
            onVote={onPostVote}
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
                onEdit={onPostEdit}
                onDelete={onPostDelete}
                onVote={onPostVote}
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
