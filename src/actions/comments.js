export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export const addComment = (id, parentId, body, author, timeCreated, voteScore = 0) => ({
  type: ADD_COMMENT,
  id,
  parentId,
  body,
  author,
  timeCreated,
  voteScore
});

export const addCommentOnServer = (id, parentId, body, author, timeCreated, voteScore = 0) => dispatch => (
  fetch('http://localhost:3001/comments', {
    method: 'POST',
    headers: {
      'Authorization': 'let-me-in-please',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      parentId,
      body,
      author,
      timestamp: timeCreated,
      voteScore
    })
  })
  .then(res => res.json())
  .then(comment => {
    dispatch(addComment(id, parentId, body, author, timeCreated, voteScore));
    return comment;
  })
  .catch(err => console.error(err))
);

const deleteComment = (id, parentId, timeDeleted) => ({
  type: DELETE_COMMENT,
  id,
  parentId,
  timeDeleted
});

export const deleteCommentOnServer = (id, parentId, timeDeleted) => dispatch => (
  fetch(`http://localhost:3001/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'let-me-in-please',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  })
  .then(comment => {
    dispatch(deleteComment(id, parentId, timeDeleted));
    return comment;
  })
  .catch(err => console.error(err))
);

const editComment = (id, body, author, timeEdited) => ({
  type: EDIT_COMMENT,
  id,
  body,
  author,
  timeEdited
});

export const editCommentOnServer = (id, body, author, timeEdited) => dispatch => (
  fetch(`http://localhost:3001/comments/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'let-me-in-please',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      body,
      author,
      timestamp: timeEdited
    })
  })
  .then(res => res.json())
  .then(comment => {
    dispatch(editComment(id, body, author, timeEdited));
    return comment;
  })
  .catch(err => console.error(err))
);

export const voteComment = (id, upvote) => ({
  type: VOTE_COMMENT,
  id,
  upvote
});
