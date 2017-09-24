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

export const deleteComment = (id, timeDeleted) => ({
  type: DELETE_COMMENT,
  id,
  timeDeleted
});

export const editComment = (id, body, author, timeEdited) => ({
  type: EDIT_COMMENT,
  id,
  body,
  author,
  timeEdited
});

export const voteComment = (id, upvote) => ({
  type: VOTE_COMMENT,
  id,
  upvote
});
