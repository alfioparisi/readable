import { ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, VOTE_COMMENT } from '../actions/types';

/**
  Handle a single comment.
*/
const comment = (state = {}, action) => {
  switch(action.type) {
    case ADD_COMMENT :
      return {
        id: action.id,
        parentId: action.parentId,
        body: action.body,
        author: action.author,
        timestamp: {
          timeCreated: action.timeCreated,
          timeEdited: [],
          timeDeleted: null
        },
        voteScore: action.voteScore,
        deleted: false
      };
    case DELETE_COMMENT :
      return {
        ...state,
        timestamp: {...state['timestamp'], timeDeleted: action.timeDeleted},
        deleted: true
      };
    case EDIT_COMMENT :
      return {
        ...state,
        body: action.body,
        author: action.author,
        timestamp: {...state['timestamp'], timeEdited: [...state['timestamp']['timeEdited'], action.timeEdited]}
      };
    case VOTE_COMMENT :
      const newScore = action.upvote ? state['voteScore'] += 1 : state['voteScore'] -= 1;
      return {
        ...state,
        voteScore: newScore
      };
    default :
      return state;
  }
};

/**
  Manage the `comments` branch of the state tree.
*/
const comments = (state = {}, action) => {
  switch(action.type) {
    case ADD_COMMENT :
      return {...state, [action.id]: comment(undefined, action)};
    case DELETE_COMMENT :
      return {...state, [action.id]: comment(state[action.id], action)};
    case EDIT_COMMENT :
      return {...state, [action.id]: comment(state[action.id], action)};
    case VOTE_COMMENT :
      return {...state, [action.id]: comment(state[action.id], action)};
    default :
      return state;
  }
};

export default comments;

export const getCommentsArray = (state, ids) => ids.map(id => state[id]).filter(comment => !comment.deleted);
