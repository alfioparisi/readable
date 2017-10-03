import React, { Component } from 'react';
import PostList from './PostList';
import Post from './Post';
import PostingForm from './PostingForm';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      writingPost: false,
      viewingPost: false,
      category: '',
      filter: 'byVoteDec'
    };
    this.handleChange = this.handleChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  componentDidMount() {
    const { name } = this.props;
    // Category showing all the posts doesn't receive a 'name' prop, so set 'react'
    // as default.
    this.setState({category: name || 'react'});
  }

  handleChange(category) {
    this.setState({category});
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
        window.alert('Invalid filter');
        return posts;
    }
  }

  render() {
    const { writingPost, viewingPost, category, filter } = this.state;
    const { name, onClick } = this.props;
    const posts = this.applyFilter();
    return (
      <main>
        <header>
          <h2>{name || 'All Categories'}</h2>
          {!viewingPost && (
            <label>Filter by:
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

const mapStateToProps = (state, ownProps) => ({
  name: ownProps.name,
  posts: Object.keys(state.posts).map(id => state.posts[id]).filter(post => {
    if (ownProps.name) return post.category === ownProps.name;
    return post;
  })
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
