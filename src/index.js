import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App.js';
import store from './reducers';
import { onTranslationLoad } from './constants/strings';

const render = () => {
    ReactDOM.render(
        <Provider store = {store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
};

onTranslationLoad.push(render);
