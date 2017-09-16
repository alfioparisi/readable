import { ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT, VOTE_COMMENT } from '../actions/comments';

const comment = (state = {}, action) => {
  switch(action.type) {
    case ADD_COMMENT :
      return {
        id: action.id,
        parentId: action.parentId,
        title: action.title,
        body: action.body,
        author: action.author,
        timestamp: {
          timeCreated: action.timeCreated,
          timeEdited: [],
          timeDeleted: null
        },
        voteScore: 0,
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
      return {
        ...state,
        voteScore: action.upvote ? state['voteScore']++ : state['voteScore']--
      };
    default :
      return state;
  }
};

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
