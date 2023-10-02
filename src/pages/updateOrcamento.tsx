import React, { useState, useEffect } from "react";
import axios from "axios";

interface OrcamentoItem {
  id: number;
  descricao: string;
  preco: number;
  quantidade: number;
}

const UpdateOrcamento: React.FC = () => {
  const [orcamentoItens, setOrcamentoItens] = useState<OrcamentoItem[]>([]);

  useEffect(() => {
    axios
      .get("https://role-mandave.vercel.app/listarOrcamento")
      .then((response) => {
        console.log("Dados da API:", response.data);
  
        if (Array.isArray(response.data)) {
          setOrcamentoItens(response.data);
        } else {
          console.error("Os dados recebidos não são um array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Erro ao obter os itens do orçamento:", error);
      });
  }, []);
  

  const handleEditItem = (id: number) => {
    console.log("Editar item com ID:", id);
  };

  const handleDeleteItem = (id: number) => {
    console.log("Excluir item com ID:", id);
  };

  return (
    <div>
      <h2>Edite ou exclua um item</h2>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Qtd</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {orcamentoItens.map((item) => (
              <tr key={item.id}>
                <td>{item.descricao}</td>
                <td>{item.preco}</td>
                <td>{item.quantidade}</td>
                <td>
                  <button onClick={() => handleEditItem(item.id)}>
                    <span role="img" aria-label="Editar">
                      ✏️
                    </span>
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDeleteItem(item.id)}>
                    <span role="img" aria-label="Excluir">
                      🗑️
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateOrcamento;
