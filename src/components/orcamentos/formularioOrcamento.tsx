import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './orcamentos.css';
import ToastManager from '../../toastManager';
import { Link } from "react-router-dom";

interface FormularioOrcamentoProps {
  updateOrcamentos: (orcamento: any) => void;
}

const FormularioOrcamento: React.FC<FormularioOrcamentoProps> = ({ updateOrcamentos }) => {
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    unidade_de_medida: '',
    qtd: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const successMessage = () => {
    toast.success('Orçamento inserido com sucesso!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
     theme: "dark",
    });
  };

  const errorMessage = () => {
    toast.error('Erro ao cadastrar o orçamento', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
     theme: "dark",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('https://role-mandave.vercel.app/cadastrarOrcamento', formData);

      updateOrcamentos(formData);

      setFormData({
        descricao: '',
        valor: '',
        unidade_de_medida: '',
        qtd: '',
      });

      successMessage();
    } catch (err) {
      errorMessage();
    }
  };

  return (
    <div className="container">
      <h2>Adicionar Orçamento</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Descrição:
          <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} placeholder="Nome do item" />
        </label>
        <label>
          Valor:
          <input type="text" name="valor" value={formData.valor} onChange={handleChange} placeholder="Apenas números" />
        </label>
        <label>
          Unidade de Medida:
          <select name="unidade_de_medida" value={formData.unidade_de_medida} onChange={handleChange}>
            <option value="">Selecione uma opção</option>
            <option value="Un">Un</option>
            <option value="Kg">Kg</option>
            <option value="Gr">Gr</option>
            <option value="Diaria">Diaria</option>
          </select>
        </label>
        <label>
          Qtd:
          <input type="text" name="qtd" value={formData.qtd} onChange={handleChange} placeholder="Apenas números inteiros" />
        </label>
        <div className={'update'}>
          <button type="submit">Cadastrar</button>
          <button><Link to="/budgets/update" className={"link"}>Editar</Link></button>
        </div>
      </form>
    </div>
  );
};

export default FormularioOrcamento;
