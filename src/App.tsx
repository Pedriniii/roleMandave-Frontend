import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import NavigationBar from './components/navBar/navBar';
import ToastManager from './toastManager';
import InitialPage from './pages/initialPage';
import Transaction from './pages/transactionsPage';
import OrcamentosPage from './pages/orcamentosPage';
import UpdateOrcamento from './pages/updateOrcamento';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <div className='navDiv'></div>
        <ToastManager />
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/budgets" element={<OrcamentosPage />} />
          <Route path="/budgets/update" element={<UpdateOrcamento />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
