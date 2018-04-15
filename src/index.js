import React from 'react';
import {BrowserRouter, Route,  Switch} from 'react-router-dom';

import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import rootReducer from './reducers';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="">
                <Switch>
                    <Route path="" component={App}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root')
);

registerServiceWorker();



