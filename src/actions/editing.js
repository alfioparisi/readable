export const EDITING = 'EDITING';

export const isEditing = (editing, comment = false, post = false) => ({
  type: EDITING,
  editing,
  comment,
  post
});
