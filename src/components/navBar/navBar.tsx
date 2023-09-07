// NavigationBar.tsx
import { useState } from 'react';
import { Link } from "react-router-dom";
import './NavigationBar.css';

function NavigationBar() {
  const [activeItem, setActiveItem] = useState<string>('home'); // Inicializa com o item 'home' como ativo

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  return (
    <nav className="navbar">
      <div
        className={`navbar-item ${activeItem === 'home' ? 'navbar-item-active' : ''}`}
        onClick={() => handleItemClick('home')}
      >
        <i className="fas fa-home"></i>
        <Link to="/" className={"link"}>Inicio</Link>
      </div>
      <div
        className={`navbar-item ${activeItem === 'transacao' ? 'navbar-item-active' : ''}`}
        onClick={() => handleItemClick('transacao')}
      >
        <Link to="/transactions" className={"link"}>Transações</Link>
      </div>
      <div
        className={`navbar-item ${activeItem === 'orcamento' ? 'navbar-item-active' : ''}`}
        onClick={() => handleItemClick('orcamento')}
      >
        <i className="fas fa-user"></i>
        <Link to="/budgets" className={"link"}>Orçamentos</Link>
      </div>
      {/* <div
        className={`navbar-item ${activeItem === 'addPagamento' ? 'navbar-item-active' : ''}`}
        onClick={() => handleItemClick('addPagamento')}
      >
        <i className="fas fa-user"></i>
        <span> + Pagamentos</span>
      </div> */}
    </nav>
  );
}

export default NavigationBar;
