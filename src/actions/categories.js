import { ADD_CATEGORY } from './types';

const addCategory = (name) => ({
  type: ADD_CATEGORY,
  name
});

const fetchCategories = () => fetch('http://localhost:3001/categories', {
  headers: {'Authorization': 'let-me-in-please'}
})
.then(res => res.json());

export const getCategoriesFromServer = () => dispatch => (
  fetchCategories()
  .then(res => res.categories.forEach(cat => dispatch(addCategory(cat.name))))
  .catch(err => {
    console.error(err);
    window.alert('Impossible to connect with the server.')
  })
);
