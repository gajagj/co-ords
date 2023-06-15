import React, { useState } from 'react';
import MainRoutes from './routes/MainRoutes';
import './App.css';

function App() {
  // below will used while implementing light/dark mode
  // const [isDarkTheme, setIsDarkTheme] = useState(false);

  // const toggleTheme = () => {
  //   document.body.dataset.theme = 'dark';
  // };

  return <MainRoutes />;
}

export default App;
