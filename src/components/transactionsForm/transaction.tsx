import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import TransactionForm from './transactionForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './transactionForm.css'

interface Recebimento {
  id: number;
  nome: string;
  sum: number;
}

const Transactions: React.FC = () => {
  const [selectRecebimento, setSelectRecebimento] = useState<Recebimento[]>([]);
  const [listaPessoas, setListaPessoas] = useState<{ id: number; nome: string }[]>([]);

  useEffect(() => {
    fetchRecebimentos();
    fetchPessoas();
  }, []);

  const fetchRecebimentos = () => {
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

  const fetchPessoas = () => {
    Axios.get('https://role-mandave.vercel.app/listarPessoas')
      .then((response) => {
        if (Array.isArray(response.data.selectPessoa)) {
          const nomesEIdsPessoas = response.data.selectPessoa.map((pessoa: any) => ({
            id: pessoa.id,
            nome: pessoa.nome
          }));
          setListaPessoas(nomesEIdsPessoas);
        } else {
          console.error('Os dados recebidos não são um array:', response.data.selectPessoa);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });
  };

  const handleTransactionAdded = () => {
    fetchRecebimentos();
  };

  const rows = selectRecebimento.map((recebimento) => (
    <tr key={recebimento.id}>
      <td>{recebimento.nome}</td>
      <td>R$ {recebimento.sum}</td>
      <td>R$ {500 - recebimento.sum}</td>
    </tr>
  ));

  return (
    <div>
      <TransactionForm onTransactionAdded={handleTransactionAdded} listaPessoas={listaPessoas} />

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
