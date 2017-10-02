import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import posts from './reducers/posts';
import comments from './reducers/comments';
import users from './reducers/users';
import currentUser from './reducers/currentUser';
import categories from './reducers/categories';
import editingComment from './reducers/editingComment';
import editingPost from './reducers/editingPost';

// If Redux DevTools extension is available, use it.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  collapsed: true
});

const reducer = combineReducers({
  posts,
  comments,
  users,
  currentUser,
  categories,
  editingComment,
  editingPost
});

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger, ReduxThunk))
);

export default store;
