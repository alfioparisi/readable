import { ADD_POST, DELETE_POST, EDIT_POST, VOTE_POST } from '../actions/posts';
import { ADD_COMMENT, DELETE_COMMENT } from '../actions/comments';

const post = (state = {}, action) => {
  switch(action.type) {
    case ADD_POST :
      return {
        category: action.category,
        title: action.title,
        body: action.body,
        author: action.author,
        timestamp: {
          timeCreated: action.timeCreated,
          timeEdited: [],
          timeDeleted: null
        },
        voteScore: 0,
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
      return {
        ...state,
        voteScore: action.upvote ? state['voteScore']++ : state['voteScore']--
      };
    case ADD_COMMENT :
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
