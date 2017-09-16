import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

import { addPost, deletePost, editPost, votePost } from './actions/posts';

store.dispatch(addPost(
  'test',
  'none',
  'Test',
  'imma a post',
  'random',
  Date.now()
));
store.dispatch(addPost(
  'test2222222',
  'some',
  'Test2222222',
  'imma a post? or not?',
  'random',
  Date.now()
));
store.dispatch(deletePost(
  'test',
  Date.now()
));
store.dispatch(editPost(
  'test2222222',
  'screw it, i am a post',
  'george',
  Date.now()
));
store.dispatch(votePost(
  'test2222222',
  true
));
store.dispatch(votePost(
  'test2222222',
  true
));
store.dispatch(votePost(
  'test2222222',
  false
));

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
registerServiceWorker();
