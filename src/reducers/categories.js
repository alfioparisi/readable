import { ADD_CATEGORY } from '../actions/types';

const category = (state = '', action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return action.name;
    default:
      return state;
  }
};

const categories = (state = [], action) => {
  switch(action.type) {
    case ADD_CATEGORY :
      return [...state, category(undefined, action)];
    default :
      return state;
  }
};

export default categories;
