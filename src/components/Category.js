import React, { Component } from 'react';
import PostList from './PostList';
import Post from './Post';
import PostingForm from './PostingForm';
import NotFound from './NotFound';
import { Route, withRouter } from 'react-router-dom';
import { getCategoryPosts } from '../reducers/posts';
import { connect } from 'react-redux';
import classNames from 'classnames';

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
      filter: 'byVoteDec',
      notfound: false
    };
    this.applyFilter = this.applyFilter.bind(this);
  }

  componentDidMount() {
    const { name, posts, location } = this.props;
    const postId = location.pathname.slice(location.pathname.lastIndexOf('/') + 1);
    const matchedId = posts.find(post => post.id === postId);
    // Category showing all the posts doesn't receive a 'name' prop, so set 'react'
    // as default.
    if (postId !== 'category' && postId !== name && !matchedId) {
      this.setState({
        category: name || 'react',
        notfound: true
      });
    } else {
      this.setState({
        category: name || 'react',
        notfound: false
      });
    }
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
    const { writingPost, viewingPost, category, filter, notfound } = this.state;
    const { history, name } = this.props;
    const posts = this.applyFilter();
    return (
      <main className="category">
        <header>
          <div className="category-title">
            <button className={classNames({
              'btn': true,
              'go-back-btn': true
            })}
              onClick={() => history.goBack()}
            >
              Go back
            </button>
            <h2>{name || 'All Categories'}</h2>
          </div>
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
        {notfound && <NotFound />}
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
            <button className="post-btn"
              onClick={() => this.setState({writingPost: true})}
            >
              <span className="post-text">Write a new post</span>
            </button>
            {writingPost && (
              <button className="post-btn"
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
  posts: getCategoryPosts(state.posts, ownProps.name)
});

export default withRouter(connect(mapStateToProps)(Category));
