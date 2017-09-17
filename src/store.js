import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import posts from './reducers/posts';
import comments from './reducers/comments';
import users from './reducers/users';

// If Redux DevTools extension is available, use it.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  posts,
  comments,
  users
});

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger, ReduxThunk))
);

export default store;
