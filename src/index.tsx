import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { AsyncTrunk } from 'mobx-sync';
import store from './scripts/store/store';

import App from './App';
import './i18n';
import './styles/index.sass';

const trunk = new AsyncTrunk(store, { storage: localStorage });

trunk.init().then(() => {
    ReactDOM.render(
        <React.StrictMode>
            <Suspense fallback={<div>Loading...</div>}>
                <Router>
                    <App />
                </Router>
            </Suspense>
        </React.StrictMode>,
        document.getElementById('root'),
    );
});

export default store;
