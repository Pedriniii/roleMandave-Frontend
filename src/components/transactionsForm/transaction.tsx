import React, { useState } from 'react';
import Axios from 'axios';
import TransactionForm from './transactionForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Recebimento {
  id: number;
  nome: string;
  sum: number;
}

const Transactions: React.FC = () => {
  const [selectRecebimento, setSelectRecebimento] = useState<Recebimento[]>([]);

  const handleTransactionAdded = () => {
    Axios.get('https://role-mandave.vercel.app/listarRecebimentos')
      .then((response) => {
        if (Array.isArray(response.data.selectRecebimento)) {
          setSelectRecebimento(response.data.selectRecebimento);
        } else {
          console.error('Os dados recebidos não são um array:', response.data.selectRecebimento);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });
  };

  const rows = selectRecebimento.map((recebimento) => (
    <tr key={recebimento.id}>
      <td>{recebimento.nome}</td>
      <td>R$ {recebimento.sum}</td>
      <td>R$ {1000 - recebimento.sum}</td>
    </tr>
  ));

  return (
    <div>
      <TransactionForm onTransactionAdded={handleTransactionAdded} />

      <h2>Adicionar Transação</h2>

      <div className={'container-table'}>
        <table>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>ID Pessoa</th>
              <th style={{ width: '15%' }}>Valor Pago</th>
              <th style={{ width: '10%' }}>Valor Restante</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Transactions;
