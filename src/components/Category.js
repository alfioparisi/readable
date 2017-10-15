import React, { Component } from 'react';
import PostList from './PostList';
import Post from './Post';
import PostingForm from './PostingForm';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

/**
  @param {string} : the name of the category (not required)
  @param {array} : the post specific for a category, that aren't deleted
*/
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      writingPost: false,
      viewingPost: false,
      category: '',
      filter: 'byVoteDec'
    };
    this.applyFilter = this.applyFilter.bind(this);
  }

  componentDidMount() {
    const { name } = this.props;
    // Category showing all the posts doesn't receive a 'name' prop, so set 'react'
    // as default.
    this.setState({category: name || 'react'});
  }

  applyFilter() {
    const { filter } = this.state;
    const { posts } = this.props;
    switch(filter) {
      case 'byVoteDec' :
        return posts.sort((a, b) => b.voteScore - a.voteScore);
      case 'byVoteCre' :
        return posts.sort((a, b) => a.voteScore - b.voteScore);
      case 'byDateNew' :
        return posts.sort((a, b) => b.timestamp.timeCreated - a.timestamp.timeCreated);
      case 'byDateOld' :
        return posts.sort((a, b) => a.timestamp.timeCreated - b.timestamp.timeCreated);
      default :
        window.alert('Invalid filter.');
        return posts;
    }
  }

  render() {
    const { writingPost, viewingPost, category, filter } = this.state;
    const { name } = this.props;
    const posts = this.applyFilter();
    return (
      <main className="category">
        <header>
          <h2>{name || 'All Categories'}</h2>
          {!viewingPost && (
            <label className="category-filter">Filter by:
              <select value={filter} onChange={evt => this.setState({filter: evt.target.value})}>
                <option value='byVoteDec'>More Likes</option>
                <option value='byVoteCre'>Less Likes</option>
                <option value='byDateNew'>Newest</option>
                <option value='byDateOld'>Oldest</option>
              </select>
            </label>
          )}
        </header>
        <Route exact path={`/category/${name || ''}`}
          render={() => <PostList
            posts={posts}
            isViewingPost={viewingPost => this.setState({viewingPost})}
            viewingPost={viewingPost}
          />}
        />
        {posts && posts.map(post => (
          <Route key={post.id} path={`/category/${post.category}/${post.id}`}
            render={() => (
              <Post
                post={post}
                showComments={true}
                isViewingPost={viewingPost => this.setState({viewingPost})}
                viewingPost={viewingPost}
              />
            )}
          />
        ))}
        {writingPost && (
          <PostingForm
            category={category}
            onChange={category => this.setState({category})}
            onClick={() => this.setState({writingPost: false})}
          />
        )}
        {!viewingPost && (
          <footer className="category-footer">
            <button className="write-post-btn"
              onClick={() => this.setState({writingPost: true})}
            >
              <span className="write-post-text">Write a new post</span>
            </button>
            {writingPost && (
              <button className="write-post-btn"
                onClick={() => this.setState({writingPost: false})}
              >
                <span className="cancel-post-text">Cancel</span>
              </button>
            )}
          </footer>
        )}
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  posts: Object.keys(state.posts).map(id => state.posts[id]).filter(post => {
    if (ownProps.name) return post.category === ownProps.name;
    return post;
  }).filter(post => !post.deleted)
});

export default withRouter(connect(mapStateToProps)(Category));
