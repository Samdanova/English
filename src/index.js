import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import './assets/styles/main.scss';
import WordContextProvider from './assets/context/wordContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
    <WordContextProvider>
    <App />
    </WordContextProvider>
    </HashRouter>
  </React.StrictMode>
);

