import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import './index.css';

import {createStore, combineReducers} from 'redux';
import {reducer as formReducer } from 'redux-form';

import {Provider} from 'react-redux';

const rootReducer = combineReducers({
    //...
    form: formReducer
});

const store = createStore(rootReducer);


ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root'));

registerServiceWorker();
