import React, { Component } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import EditingForm from './EditingForm';
import { Link } from 'react-router-dom';
import { addComment } from '../actions/comments';
import { editPostOnServer, deletePostOnServer, votePostOnServer } from '../actions/posts';
import { isEditing } from '../actions/editing';
import { connect } from 'react-redux';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      writingComment: false,
      filter: 'byVoteDec'
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
    const { writingComment, filter } = this.state;
    return (
      <article>
        <header>
          <Link to={`/category/${category}/${id}`}>
            <h3>{title}</h3>
          </Link>
          <h5>Category: {category}</h5>
          <h5>Posted by: {author}</h5>
          <h5>Time posted: {date}</h5>
          {viewingPost && <h5>This post has {comments.length} comments.</h5>}
        </header>
        <p>{body}</p>
        {editing && <EditingForm body={body} onEdit={(textarea, timeEdited) => {
          const author = currentUser || 'Anonymous';
          onEdit(id, textarea, author, timeEdited);
        }} />}
        <footer>
          <p>This post has {Math.abs(voteScore)} {voteScore >= 0 ? 'likes' : 'dislikes'}</p>
          <div>
            <button onClick={() => onVote(id, true)}>Upvote</button>
            <button onClick={() => onVote(id, false)}>Downvote</button>
          </div>
          {viewingPost && (
            <div>
              <button onClick={() => isEditing(true)}>Edit</button>
              <button onClick={() => onDelete(id, Date.now())}>Delete</button>
            </div>
          )}
          {writingComment && (
            <CommentForm
              parentId={id}
              onClick={() => this.setState({writingComment: false})}
            />
          )}
          {viewingPost && (
            <div>
              <button
                onClick={() => this.setState({writingComment: true})}
              >Add a comment</button>
            </div>
          )}
        </footer>
        {showComments && comments && (
          <section>
            <header>
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
  comments: ownProps.post.comments.map(commentId => state.comments[commentId]).filter(comment => !comment.deleted)
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
