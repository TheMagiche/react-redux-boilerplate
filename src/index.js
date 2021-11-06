import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'; // set up redux
import { Provider } from 'react-redux';

import thunk from 'redux-thunk'; // redux middleware

import App from './views/App'; // main Component

import 'bootstrap/dist/css/bootstrap.min.css';

import rootReducer from './reducers/rootReducer'; // import main reducer

const store = createStore(
	rootReducer,
	applyMiddleware(thunk)
)

if(localStorage.token) {
	const token = JSON.parse(localStorage.token);
	store.dispatch({type: 'SET_LOGIN', value: token});
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));