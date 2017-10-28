import React, { Component } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import EditingForm from './EditingForm';
import { Link } from 'react-router-dom';
import NotFound from './NotFound';
import { addComment } from '../actions/comments';
import { editPostOnServer, deletePostOnServer, votePostOnServer } from '../actions/posts';
import { isEditing } from '../actions/editing';
import { getCommentsArray } from '../reducers/comments';
import { connect } from 'react-redux';
import classNames from 'classnames';

/**
  @param {object} : the post
  @param {boolean} : whether to show comments or not
  @param {function} : change whether we are in PostView or not
  @param {boolean} : if we are in post view
  @param {string} : the logged in user, if any
  @param {boolean} : if we are editing
  @param {array} : this post comments
  @param {function} : dispatch edit action
  @param {function} : dispatch delete action
  @param {function} : dispatch vote action
  @param {function} : change the editing status
  @param {function} : dispatch add comment to Redux
*/
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      writingComment: false,
      filter: 'byVoteDec',
      infoOpen: false
    };
    this.applyFilter = this.applyFilter.bind(this);
  }

  /**
    Get the comments for this specific post.
  */
  componentDidMount() {
    const { post, showComments, isViewingPost, onCommentAdd } = this.props;
    const { id, comments: alreadyPresentComments } = post;
    if (showComments) {
      fetch(`http://localhost:3001/posts/${id}/comments`, {
        headers: {'Authorization': 'let-me-in-please'}
      })
      .then(res => res.json())
      .then(comments => {
        const parentId = id;
        comments.forEach(comment => {
          const { id, body, author, timestamp, voteScore } = comment;
          // If the comment is not in Redux state, dispatch an action for it.
          if (alreadyPresentComments.indexOf(id) === -1) {
            onCommentAdd(id, parentId, body, author, timestamp, voteScore);
          }
        });
      })
      .catch(err => {
        console.error(err);
        window.alert('Couldnt fetch comments for this post.');
      });
      isViewingPost(true);
    } else {
      isViewingPost(false);
    }
  }

  applyFilter() {
    const { filter } = this.state;
    const { comments } = this.props;
    switch(filter) {
      case 'byVoteDec' :
        return comments.sort((a, b) => b.voteScore - a.voteScore);
      case 'byVoteCre' :
        return comments.sort((a, b) => a.voteScore - b.voteScore);
      case 'byDateNew' :
        return comments.sort((a, b) => b.timestamp.timeCreated - a.timestamp.timeCreated);
      case 'byDateOld' :
        return comments.sort((a, b) => a.timestamp.timeCreated - b.timestamp.timeCreated);
      default :
        window.alert('Invalid filter');
        return comments;
    }
  }

  render() {
    const { post, showComments, viewingPost, currentUser, comments, editing } = this.props;
    const { id, category, title, body, author, timestamp, voteScore } = post;
    const date = new Date(timestamp.timeCreated).toLocaleString();
    const { onEdit, onDelete, onVote, isEditing } = this.props;
    const { writingComment, filter, infoOpen } = this.state;

    if (post.deleted) return <NotFound />;

    return (
      <article>
        <header>
          <h3><Link to={`/category/${category}/${id}`}>
            {title}
          </Link></h3>
          <div>
            <button className={classNames({
              'btn': true,
              'info-btn': true
            })}
              onClick={() => this.setState(prevState => ({infoOpen: !prevState.infoOpen}))}
            >More info</button>
            {infoOpen && (
              <div className="post-info__info">
                <h5>Category: {category}</h5>
                <h5>Posted by: {author}</h5>
                <h5>Time posted: {date}</h5>
                {viewingPost && <h5>This post has {comments.length} comments.</h5>}
              </div>
            )}
          </div>
        </header>
        <p>{body}</p>
        {editing && <EditingForm body={body} onEdit={(textarea, timeEdited) => {
          const author = currentUser || 'Anonymous';
          onEdit(id, textarea, author, timeEdited);
        }} />}
        <footer>
          <small
            className={classNames({
              'upvoted': voteScore >= 0,
              'downvoted': voteScore < 0
            })}>
            This post has {Math.abs(voteScore)}
          </small>
          <div>
            <button
              className={classNames({
                'btn': true,
                'upvote': true
              })}
              onClick={() => onVote(id, true)}>Upvote</button>
            <button
              className={classNames({
                'btn': true,
                'downvote': true
              })}
              onClick={() => onVote(id, false)}>Downvote</button>
          </div>
          <div>
            <button className="post-btn" onClick={() => isEditing(true)}>
              <span className="edit-post-text">Edit</span>
            </button>
            <button className="post-btn"
              onClick={() => {
                onDelete(id, Date.now());
              }}
            >
              <span className="delete-post-text">Delete</span>
            </button>
          </div>
          {writingComment && (
            <CommentForm
              parentId={id}
              onClick={() => this.setState({writingComment: false})}
            />
          )}
          {viewingPost && (
            <div className="add-comment-container">
              <button className={classNames({
                'post-btn': true,
                'add-comment-btn': true
              })}
                onClick={() => this.setState({writingComment: true})}
              >
                <span className="add-comment-text">Add a comment</span>
              </button>
              {writingComment && (
                <button className="cancel-add-comment"
                  onClick={() => this.setState({writingComment: false})}
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        </footer>
        {showComments && comments && (
          <section>
            <header className="comments-header">
              <h3>Comments</h3>
              <label>Filter by:
                <select value={filter} onChange={evt => this.setState({filter: evt.target.value})}>
                  <option value='byVoteDec'>More Likes</option>
                  <option value='byVoteCre'>Less Likes</option>
                  <option value='byDateNew'>Newest</option>
                  <option value='byDateOld'>Oldest</option>
                </select>
              </label>
            </header>
            {this.applyFilter().map(comment => (
              <Comment key={comment.id}
                comment={comment}
              />
            ))}
          </section>
        )}
      </article>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.currentUser,
  editing: state.editingPost,
  comments: getCommentsArray(state.comments, ownProps.post.comments)
});

const mapDispatchToProps = dispatch => ({
  onEdit: (id, body, author, timeEdited) => {
    dispatch(editPostOnServer(id, body, author, timeEdited));
    dispatch(isEditing(false, false, true));
  },
  onDelete: (id, timeDeleted) => dispatch(deletePostOnServer(id, timeDeleted)),
  onVote: (id, upvote) => dispatch(votePostOnServer(id, upvote)),
  isEditing: editing => dispatch(isEditing(editing, false, true)),
  onCommentAdd: (id, parentId, body, author, timestamp, voteScore) => dispatch(addComment(id, parentId, body, author, timestamp, voteScore))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
