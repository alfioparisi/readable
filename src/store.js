import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import posts from './reducers/posts';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  posts
});

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger))
);

export default store;
