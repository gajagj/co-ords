import React from 'react';
import MainRoutes from './routes/MainRoutes';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import FallbackError from './components/error-boundary/FallbackError';
import './App.css';

function App() {
  // below will used while implementing light/dark mode
  // const [isDarkTheme, setIsDarkTheme] = useState(false);

  // const toggleTheme = () => {
  //   document.body.dataset.theme = 'dark';
  // };

  return (
    <ErrorBoundary fallback={<FallbackError />}>
      <MainRoutes />
    </ErrorBoundary>
  );
}

export default App;
