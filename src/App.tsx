import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import NavigationBar from './components/navBar/navBar';
import InitialPage from './pages/initialPage';
import Transaction from './pages/transactionsPage';
import OrcamentosPage from './pages/orcamentosPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/budgets" element={<OrcamentosPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
