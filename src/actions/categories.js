import { ADD_CATEGORY } from './types';

const addCategory = (name) => ({
  type: ADD_CATEGORY,
  name
});

export const getCategoriesFromServer = () => dispatch => (
  fetch('http://localhost:3001/categories', {
    headers: {'Authorization': 'let-me-in-please'}
  })
  .then(res => res.json())
  .then(res => res.categories.forEach(cat => dispatch(addCategory(cat.name))))
  .catch(err => {
    console.error(err);
    window.alert('Impossible to connect with the server.')
  })
);
