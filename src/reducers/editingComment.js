import { EDITING } from '../actions/types';

const editingComment = (state = false, action) => {
  switch(action.type) {
    case EDITING :
      if (action.comment) return action.editing;
      else return state;
    default :
      return state;
  }
};

export default editingComment;
