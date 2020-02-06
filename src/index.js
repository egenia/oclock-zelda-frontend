import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import ConnectedIntlProvider from './components/i18n/ConnectedIntlProvider';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
    <Provider store={store}>
        <ConnectedIntlProvider>
            <App />
        </ConnectedIntlProvider>
    </Provider>
    , document.getElementById('root')
);

