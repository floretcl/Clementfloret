import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n.js';
import i18n from "i18next";
import ThemeProvider from "./ThemeProvider.jsx";
import App from './App.jsx'
import './index.scss'

const language = document.querySelector('html').getAttribute('lang');
i18n.changeLanguage(language);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </React.StrictMode>,
)
