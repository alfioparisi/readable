import { ADD_POST, DELETE_POST, EDIT_POST, VOTE_POST } from '../actions/types';
import { ADD_COMMENT, DELETE_COMMENT } from '../actions/types';

/**
  Handle a single post.
*/
const post = (state = {}, action) => {
  switch(action.type) {
    case ADD_POST :
      return {
        id: action.id,
        category: action.category,
        title: action.title,
        body: action.body,
        author: action.author,
        timestamp: {
          timeCreated: action.timeCreated,
          timeEdited: [],
          timeDeleted: null
        },
        voteScore: action.voteScore,
        deleted: false,
        comments: []
      };
    case DELETE_POST :
      return {
        ...state,
        timestamp: {...state['timestamp'], timeDeleted: action.timeDeleted},
        deleted: true
      };
    case EDIT_POST :
      return {
        ...state,
        body: action.body,
        author: action.author,
        timestamp: {...state['timestamp'], timeEdited: [...state['timestamp']['timeEdited'], action.timeEdited]}
      };
    case VOTE_POST :
      const newScore = action.upvote ? state['voteScore'] += 1 : state['voteScore'] -= 1;
      return {
        ...state,
        voteScore: newScore
      };
    case ADD_COMMENT :
      if (state['comments'].find(comment => comment === action.id)) return state;
      return {
        ...state,
        comments: [...state['comments'], action.id]
      };
    case DELETE_COMMENT :
      return {
        ...state,
        comments: state['comments'].filter(commentId => commentId !== action.id)
      };
    default:
      return state;
  }
};

/**
  Manage the `posts` branch of the state tree.
*/
const posts = (state = {}, action) => {
  switch(action.type) {
    case ADD_POST :
      return {...state, [action.id]: post(undefined, action)};
    case DELETE_POST :
      return {...state, [action.id]: post(state[action.id], action)};
    case EDIT_POST :
      return {...state, [action.id]: post(state[action.id], action)};
    case VOTE_POST :
      return {...state, [action.id]: post(state[action.id], action)};
    case ADD_COMMENT :
      return {...state, [action.parentId]: post(state[action.parentId], action)};
    case DELETE_COMMENT :
      return {...state, [action.parentId]: post(state[action.parentId], action)};
    default :
      return state;
  }
};

export default posts;

export const getCategoryPosts = (state, name) => Object.keys(state).map(id => state[id]).filter(post => {
  if (name) return post.category === name ? post : null;
  return post;
})
