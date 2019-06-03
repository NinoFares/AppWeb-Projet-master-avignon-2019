/**
 * Fichier racine du projet avec une préconfiguration de redux
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux'
import { store } from "./_helpers";
import { App } from './App';



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
