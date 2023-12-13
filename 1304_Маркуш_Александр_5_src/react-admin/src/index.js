import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from './App';

const defaultState = { tradingList: [] };

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SAVE":
            return { ...state, tradingList: action.tradingList };
        default:
            return state;
    }
}

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
