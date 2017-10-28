import { SIGN_UP, LOG_IN, LOG_OUT } from '../actions/types';

const currentUser = (state = '', action) => {
  switch(action.type) {
    case SIGN_UP :
      return action.name;
    case LOG_IN :
      return action.name;
    case LOG_OUT :
      return '';
    default :
      return state;
  }
};

export default currentUser;
