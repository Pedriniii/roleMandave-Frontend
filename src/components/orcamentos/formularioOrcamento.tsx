import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/cadastrarOrcamento', formData);
      console.log('Orçamento cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar o orçamento:', error);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Descrição:
        <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} />
      </label>
      <label>
        Valor:
        <input type="text" name="valor" value={formData.valor} onChange={handleChange} />
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
        <input type="text" name="qtd" value={formData.qtd} onChange={handleChange} />
      </label>
      <button type="submit" onClick={refreshPage}>Cadastrar</button>
    </form>
    </div>
  );
};

export default FormularioOrcamento;
