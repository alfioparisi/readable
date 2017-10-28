import { EDITING } from '../actions/types';

const editingPost = (state = false, action) => {
  switch(action.type) {
    case EDITING :
      if (action.post) return action.editing;
      return state;
    default :
      return state;
  }
};

export default editingPost;
