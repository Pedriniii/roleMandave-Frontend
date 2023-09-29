import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import TransactionForm from './transactionForm';
import './transactionForm.css';

interface Recebimento {
  id: number;
  nome: string;
  sum: number;
}

const Transactions: React.FC = () => {
  const [selectRecebimento, setSelectRecebimento] = useState<Recebimento[]>([]);

  useEffect(() => {
    Axios.get('http://localhost:8080/listarRecebimentos')
      .then((response) => {
        console.log('Resposta da requisição:', response.data);

        if (Array.isArray(response.data.selectRecebimento)) {
          setSelectRecebimento(response.data.selectRecebimento);
        } else {
          console.error('Os dados recebidos não são um array:', response.data.selectRecebimento);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });
  }, []);

  const rows = selectRecebimento.map((recebimento) => (
    <tr key={recebimento.id}>
      <td>{recebimento.nome}</td>
      <td>R$ {recebimento.sum}</td>
      <td>R$ {1000 - recebimento.sum}</td>
    </tr>
  ));

  return (
    <div>
      <TransactionForm />
      <table>
        <thead>
          <tr>
            <th style={{ width: '30%' }}>ID Pessoa</th>
            <th style={{ width: '15%' }}>Valor Pago</th>
            <th style={{ width: '10%' }}>Valor Restante</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
