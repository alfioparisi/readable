import { CHANGE_DRAWER_STATE } from './types';

export const changeDrawerState = open => ({
  type: CHANGE_DRAWER_STATE,
  open
});
