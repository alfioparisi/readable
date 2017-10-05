import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

/*
  TODO:
    * on edit, prefill the form with the existing content
    * posts should show how many comments they have
    * date should be in readable format
    * connect()
    * polish React state
    * form validation
    * README
*/
