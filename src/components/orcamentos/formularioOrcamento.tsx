import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './orcamentos.css';

const FormularioOrcamento: React.FC = () => {
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
    toast.success("Orçamento inserido com sucesso!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      draggable: true
    });
  } 

  const errorMessage = () => {
    toast.error("Erro ao cadastrar o orçamento: ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      draggable: true
    });
  }


  const handleSubmit = async (e: FormEvent) => {
    try {
      await axios.post('https://role-mandave.vercel.app/cadastrarOrcamento', formData);
      successMessage()
    } catch (err) {
      errorMessage()
    }
  };

  return (
    <div className={"container"}>
      <h2>Adicionar Orçamento</h2>
    <form onSubmit={handleSubmit}>
      <label>
        Descrição:
        <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} placeholder='Nome do item'/>
      </label>
      <label>
        Valor:
        <input type="text" name="valor" value={formData.valor} onChange={handleChange} placeholder='Apenas numeros'/>
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
        <input type="text" name="qtd" value={formData.qtd} onChange={handleChange} placeholder='Apenas numeros inteiros'/>
      </label>
      <button type="submit">Cadastrar</button>
    </form>

    <button onClick={successMessage}>Teste</button>
    </div>
  );
};

export default FormularioOrcamento;
