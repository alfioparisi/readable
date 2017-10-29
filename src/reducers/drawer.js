import { CHANGE_DRAWER_STATE } from '../actions/types';

const drawer = (state = false, action) => {
  switch (action.type) {
    case CHANGE_DRAWER_STATE:
      return action.open;
    default:
      return state;
  }
};

export default drawer;
