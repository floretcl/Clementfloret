import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n.js';
import ThemeProvider from "./ThemeProvider.jsx";
import App from './App.jsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </React.StrictMode>,
)
