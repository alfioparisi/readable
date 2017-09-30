import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App store={store} />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();

/*
  TODO:
    * on edit, prefill the form with the existing content
    * posts should show how many comments they have
    * date should be in readable format
    * connect()
    * README
*/
