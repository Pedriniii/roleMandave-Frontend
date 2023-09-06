import React from 'react';
import './App.css';
import NavigationBar from './components/navBar/navBar';
import InitialPage from './pages/initialPage';

function App() {
  return (
    <div className="App">
      <InitialPage />
      <NavigationBar />
    </div>
  );
}

export default App;
