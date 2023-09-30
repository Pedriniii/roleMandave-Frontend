import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './transactionForm.css';

interface Pessoa {
  id: number;
  nome: string;
}

const TransactionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    id_pessoa: '',
    valor_pago: '',
    data_recebimento: '',
  });

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  useEffect(() => {
    Axios.get('https://role-mandave.vercel.app/listarPessoas')
      .then((response) => {
        if (Array.isArray(response.data.selectPessoa)) {
          setPessoas(response.data.selectPessoa);
        } else {
          console.error('Os dados recebidos não são um array:', response.data.selectPessoa);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await Axios.post('https://role-mandave.vercel.app/cadastrarRecebimento', formData);
      console.log('Recebimento cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar o recebimento:', error);
    }
  };

  return (
    <div>
      <h2>Adicionar Transação</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id_pessoa">Quem pagou:</label>
          <select
            className="form-control"
            id="id_pessoa"
            name="id_pessoa"
            value={formData.id_pessoa}
            onChange={handleChange}
          >
            <option value="">Selecione alguém</option>
            {pessoas.map((pessoa) => (
              <option key={pessoa.id} value={pessoa.id}>
                {pessoa.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="valor_pago">Valor pago:</label>
          <input
            type="number"
            className="form-control"
            id="valor_pago"
            name="valor_pago"
            value={formData.valor_pago}
            onChange={handleChange}
            placeholder="Apenas numeros"
          />
        </div>

        <div className="form-group">
          <label htmlFor="data_recebimento">Data do pagamento:</label>
          <input
            type="date"
            className="form-control"
            id="data_recebimento"
            name="data_recebimento"
            value={formData.data_recebimento}
            onChange={handleChange}
          />
        </div>

        <button type="submit" onClick={refreshPage}>
          Adicionar Pagamento
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
