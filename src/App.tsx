import React, { useState } from 'react';
// import { ThemeProvider } from 'styled-components';
import MainRoutes from './routes/MainRoutes';
import './App.css';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    document.body.dataset.theme = 'dark';
  };

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <h1>Welcome to My App</h1>
      <MainRoutes />
    </div>
  );
}

export default App;
