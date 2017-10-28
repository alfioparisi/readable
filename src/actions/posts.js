import { ADD_POST, EDIT_POST, DELETE_POST, VOTE_POST } from './types';

const url = 'http://localhost:3001/posts/';

const headers = {
  'Authorization': 'let-me-in-please',
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const addPost = (id, category, title, body, author, timeCreated, voteScore = 1) => ({
  type: ADD_POST,
  id,
  category,
  title,
  body,
  author,
  timeCreated,
  voteScore
});

export const getInitialPosts = () => dispatch => (
  fetch(url, { headers })
  .then(res => res.json())
  .then(posts => {
    posts.forEach(post => {
      const { id, category, title, body, author, timestamp, voteScore } = post;
      dispatch(addPost(id, category, title, body, author, timestamp, voteScore));
    });
    return posts;
  })
  .catch(err => console.error(err))
);

// By returning the 'fetch()' call we'll be able to chain '.then()' when we'll call
// 'store.dispatch(addPostOnServer())'
export const addPostOnServer = (id, category, title, body, author, timeCreated) => dispatch => (
  fetch(url, {
    method: 'POST',
    headers,
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
  fetch(`${url}${id}`, {
    method: 'DELETE',
    headers,
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
  fetch(`${url}${id}`, {
    method: 'PUT',
    headers,
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
  fetch(`${url}${id}`, {
    method: 'POST',
    headers,
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
