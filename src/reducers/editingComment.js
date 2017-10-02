import { EDITING } from '../actions/editing';

const editingComment = (state = false, action) => {
  switch(action.type) {
    case EDITING :
      return action.editing;
    default :
      return state;
  }
};

export default editingComment;
