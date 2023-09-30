import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import './orcamentos.css'
import FormularioOrcamento from './formularioOrcamento';


interface Orcamento {
  descricao: string;
  total: number;
  valor: number;
  unidade_de_medida: string;
  qtd: number;
}

function Orcamentos() {
  const [selectOrcamento, setSelectOrcamento] = useState<Orcamento[]>([]);

  useEffect(() => {
    // Faz a requisição para o servidor
    axios.get('listarOrcamento')
      .then((response) => {
        console.log('Resposta da requisição:', response.data);
  
        // Verifica se a resposta possui dados e são um array
        if (Array.isArray(response.data.selectOrcamento)) {
          setSelectOrcamento(response.data.selectOrcamento);
        } else {
          console.error('Os dados recebidos não são um array:', response.data.selectOrcamento);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });
  }, []); // Executa apenas uma vez quando o componente monta
  
  

  // Verifica se selectOrcamento é um array antes de fazer o map
  const orcamentoRows = Array.isArray(selectOrcamento) ?
    selectOrcamento.map((orcamento: Orcamento, index: number) => (
      <tr key={index}>
        <td>{orcamento.descricao}</td>
        <td>{orcamento.valor}</td>
        <td>{orcamento.total}</td>
        <td>{orcamento.unidade_de_medida}</td>
        <td>{orcamento.qtd}</td>
      </tr>
    )) :
    null;

  return (
    <div>
      <FormularioOrcamento />
      <h2>Orçamento</h2>
      <div  className={"container-table"}>
      <table>
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Descrição</th>
            <th style={{ width: "15%" }}>Preço</th>
            <th style={{ width: "15%" }}>Total</th>
            <th style={{ width: "10%" }}>UN</th>
            <th style={{ width: "10%" }}>QTD</th>
          </tr>
        </thead>
        <tbody>
          {orcamentoRows}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Orcamentos;
