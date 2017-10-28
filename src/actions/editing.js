import { EDITING } from './types';

export const isEditing = (editing, comment = false, post = false) => ({
  type: EDITING,
  editing,
  comment,
  post
});
