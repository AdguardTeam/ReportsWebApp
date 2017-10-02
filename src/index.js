import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.js';
import store from './reducers';
import { onTranslationLoad } from './constants/strings';
import Raven from 'raven-js';

if (window.sentry_client_key) {
    Raven
        .config(window.sentry_client_key)
        .install()
    ;
}

const render = () => {
    ReactDOM.render(
        <Provider store = {store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
};

onTranslationLoad.push(render);
