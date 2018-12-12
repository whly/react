import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/styles/index.scss'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
import { crudStore } from './shared/stores/CRUDStore';

ReactDOM.render(
    <Provider
  crudStore={crudStore} 
  >
  <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
