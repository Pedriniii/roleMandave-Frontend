import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { format } from 'date-fns';
import './bottom.css';

interface ExtratoRecebimento {
  nome: string;
  valor_pago: string;
  data_recebimento: string;
}

interface Pessoa {
  nome: string;
}

function Recebimentos() {
  const [extratoRecebimento, setExtratoRecebimento] = useState<ExtratoRecebimento[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  useEffect(() => {
    Axios.get('https://role-mandave.vercel.app/extratoRecebimentos')
      .then((response) => {
        if (Array.isArray(response.data.extratoRecebimento)) {
          setExtratoRecebimento(response.data.extratoRecebimento);
        } else {
          console.error('Os dados recebidos não são um array:', response.data.extratoRecebimento);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });

    Axios.get('https://role-mandave.vercel.app/listarPessoas')
      .then((response) => {
        if (Array.isArray(response.data.selectPessoa)) {
          setPessoas(response.data.selectPessoa);
        } else {
          console.error('Os dados recebidos não são um array:', response.data.selectPessoa);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados das pessoas:', error);
      });
  }, []);

  const formatDate = (date: string) => {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy');
    return formattedDate;
  };

  const handleSortBy = (criteria: string) => {
    setSortBy(criteria);
  };

  const handlePersonFilter = (person: string) => {
    setSelectedPerson(person);
  };

  const filteredItems = extratoRecebimento.filter(item => !selectedPerson || item.nome === selectedPerson);

  if (sortBy) {
    filteredItems.sort((a, b) => {
      if (sortBy === 'date') {
        // Ordenação descendente por data
        return new Date(b.data_recebimento).getTime() - new Date(a.data_recebimento).getTime();
      } else if (sortBy === 'name') {
        return a.nome.localeCompare(b.nome);
      }
      return 0;
    });
  }

  return (
    <div className={'bottomMain'}>
      <div>
        <button onClick={() => handleSortBy('date')}>Ordenar por Data de Pagamento (Desc)</button>
        <button onClick={() => handleSortBy('name')}>Ordenar por Pessoa</button>
        <select onChange={(e) => handlePersonFilter(e.target.value)}>
          <option value="">Mostrar Todos</option>
          {pessoas.map((pessoa, index) => (
            <option key={index} value={pessoa.nome}>{pessoa.nome}</option>
          ))}
        </select>
      </div>

      {filteredItems.map((item, index) => (
        <div key={index} className={'containerPaymants'}>
          <div className={'paymants'}>
            <span>🤑 - </span>
            <div>
              <span><strong>{item.nome}</strong></span>
              <p>R$ {item.valor_pago}</p>
            </div>
          </div>
          <div>
            <h5>{formatDate(item.data_recebimento)}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recebimentos;
