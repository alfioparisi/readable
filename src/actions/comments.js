export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export const addComment = (id, parentId, category, body, author, timeCreated) => ({
  type: ADD_COMMENT,
  id,
  parentId,
  category,
  body,
  author,
  timeCreated
});

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
