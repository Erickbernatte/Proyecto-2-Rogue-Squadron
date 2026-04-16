import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GameDataProvider } from './context/GameDataContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameDataProvider>
      <App />
    </GameDataProvider>
  </React.StrictMode>
);
