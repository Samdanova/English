import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/styles/main.scss';
import WordContextProvider from './assets/context/wordContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    <WordContextProvider>
    <App />
    </WordContextProvider>
    </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
