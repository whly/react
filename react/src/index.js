import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/styles/index.scss'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
import { crudStore } from './shared/stores/CRUDStore';
import { searchStore } from './shared/stores/SearchStore';
import * as firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp({
    apiKey: "AIzaSyDkMzi07dukKoWDyDNs1WLjqi3bLfDVlPU",
    authDomain: "qprice-db76b.firebaseapp.com",
    databaseURL: "https://qprice-db76b.firebaseio.com",
    projectId: "qprice-db76b",
    storageBucket: "qprice-db76b.appspot.com",
    messagingSenderId: "457561759367"
});

ReactDOM.render(
    <Provider
        crudStore={crudStore} 
        searchStore={searchStore}
    >
      <App />
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
