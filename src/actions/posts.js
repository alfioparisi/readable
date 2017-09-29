export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const VOTE_POST = 'VOTE_POST';

export const addPost = (id, category, title, body, author, timeCreated, voteScore = 1) => ({
  type: ADD_POST,
  id,
  category,
  title,
  body,
  author,
  timeCreated,
  voteScore
});

// By returning the 'fetch()' call we'll be able to chain '.then()' when we'll call
// 'store.dispatch(addPostOnServer())'
export const addPostOnServer = (id, category, title, body, author, timeCreated) => dispatch => (
  fetch('http://localhost:3001/posts', {
    method: 'POST',
    headers: {
      'Authorization': 'let-me-in-please',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      timestamp: timeCreated,
      title,
      body,
      author,
      category
    })
  })
  .then(post => {
    dispatch(addPost(id, category, title, body, author, timeCreated));
    return post;
  })
  .catch(err => console.error(err))
);

const deletePost = (id, timeDeleted) => ({
  type: DELETE_POST,
  id,
  timeDeleted
});

export const deletePostOnServer = (id, timeDeleted) => dispatch => (
  fetch(`http://localhost:3001/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'let-me-in-please',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  })
  .then(post => {
    dispatch(deletePost(id, timeDeleted));
    return post;
  })
  .catch(err => console.error(err))
);

const editPost = (id, body, author, timeEdited) => ({
  type: EDIT_POST,
  id,
  body,
  author,
  timeEdited
});

export const editPostOnServer = (id, body, author, timeEdited) => dispatch => (
  fetch(`http://localhost:3001/posts/${id}`, {
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
  .then(post => {
    dispatch(editPost(id, body, author, timeEdited));
    return post;
  })
  .catch(err => console.error(err))
);

const votePost = (id, upvote) => ({
  type: VOTE_POST,
  id,
  upvote
});

export const votePostOnServer = (id, upvote) => dispatch => (
  fetch(`http://localhost:3001/posts/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': 'let-me-in-please',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      option: upvote ? 'upVote' : 'downVote'
    })
  })
  .then(res => res.json())
  .then(post => {
    dispatch(votePost(id, upvote));
    return post;
  })
  .catch(err => console.error(err))
);
