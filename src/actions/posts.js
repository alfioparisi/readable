export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const VOTE_POST = 'VOTE_POST';

export const addPost = (id, category, title, body, author, timeCreated) => ({
  type: ADD_POST,
  id,
  category,
  title,
  body,
  author,
  timeCreated
});

export const addPostOnServer = (id, category, title, body, author, timeCreated) => dispatch => {
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
  .then(res => dispatch(addPost(id, category, title, body, author, timeCreated)))
  .catch(err => console.error(err));
};

export const deletePost = (id, timeDeleted) => ({
  type: DELETE_POST,
  id,
  timeDeleted
});

export const editPost = (id, body, author, timeEdited) => ({
  type: EDIT_POST,
  id,
  body,
  author,
  timeEdited
});

export const votePost = (id, upvote) => ({
  type: VOTE_POST,
  id,
  upvote
});
