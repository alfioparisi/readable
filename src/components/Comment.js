import React from 'react';
import EditingForm from './EditingForm';
import { editCommentOnServer, deleteCommentOnServer, voteCommentOnServer } from '../actions/comments';
import { isEditing } from '../actions/editing';
import { connect } from 'react-redux';

/**
  @param {object} : the comment
  @param {boolean} : whether we are in edit mode or not
  @param {string} : the logged in user, if any
  @param {function} : edit the comment
  @param {function} : delete this comment
  @param {function} : vote this comment
  @param {function} : allow for editing
*/
const Comment = ({ comment, editing, currentUser, onEdit, onDelete, onVote, isEditing }) => {
  const { id, parentId, body, author, timestamp, voteScore } = comment;
  const date = new Date(timestamp.timeCreated).toLocaleString();
  return (
    <section>
      <header>
        <h5>Comment by: {author}</h5>
        <h5>Commented at: {date}</h5>
      </header>
      <p>{body}</p>
      {editing && <EditingForm body={body} onEdit={(textarea, timeEdited) => {
        const author = currentUser || 'Anonymous';
        onEdit(id, textarea, author, timeEdited);
      }} />}
      <footer>
        <p>This comment has {Math.abs(voteScore)} {voteScore >= 0 ? 'likes' : 'dislikes'}</p>
        <div>
          <button onClick={() => onVote(id, true)}>Upvote</button>
          <button onClick={() => onVote(id, false)}>Downvote</button>
          <button onClick={() => isEditing(true)}>Edit</button>
          <button onClick={() => onDelete(id, parentId, Date.now())}>Delete</button>
        </div>
      </footer>
    </section>
  );
};

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.currentUser,
  editing: state.editingComment
});

const mapDispatchToProps = dispatch => ({
  onEdit: (id, body, author, timeEdited) => {
    dispatch(editCommentOnServer(id, body, author, timeEdited));
    dispatch(isEditing(false, true, false));
  },
  onDelete: (id, parentId, timeDeleted) => dispatch(deleteCommentOnServer(id, parentId, timeDeleted)),
  onVote: (id, upvote) => dispatch(voteCommentOnServer(id, upvote)),
  isEditing: editing => dispatch(isEditing(editing, true, false))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
