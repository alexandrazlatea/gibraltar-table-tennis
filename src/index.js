import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route,  Switch} from 'react-router-dom';

import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import registerServiceWorker from './registerServiceWorker';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import rootReducer from './reducers';
import PrivacyPolicy from './components/PrivacyPolicy';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="">
                <Switch>
                    <Route path="/privacy-policy" component={PrivacyPolicy}/>
                    <Route path="" component={App}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>, document.getElementById('root')
);

registerServiceWorker();



