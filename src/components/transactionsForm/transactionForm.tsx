import React, { useState } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TransactionFormProps {
  onTransactionAdded: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    id_pessoa: '',
    valor_pago: '',
    data_recebimento: '',
  });

  const showSuccessToast = (message: string) => {
    toast.success(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const showErrorToast = (message: string) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
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
      showSuccessToast('Recebimento cadastrado com sucesso!');
      console.log('Recebimento cadastrado com sucesso!');
      onTransactionAdded();  // Chama a função de atualização
    } catch (error) {
      showErrorToast('Erro ao cadastrar o recebimento');
      console.error('Erro ao cadastrar o recebimento:', error);
    }
  };

  return (
    <div className={'container'}>
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
            {/* Adicione as opções com base nos dados disponíveis */}
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
            placeholder="Apenas números"
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

        <button type="submit">Adicionar Pagamento</button>
      </form>
    </div>
  );
};

export default TransactionForm;
