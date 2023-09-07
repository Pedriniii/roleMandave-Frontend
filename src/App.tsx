import React from 'react';
import './App.css';
import NavigationBar from './components/navBar/navBar';
import InitialPage from './pages/initialPage';
// import Transaction from './pages/transactions';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <InitialPage />
    </div>
  );
}

export default App;
