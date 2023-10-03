import React, { useState, useEffect } from "react";
import axios from "axios";

interface OrcamentoItem {
  id: number;
  descricao: string;
  valor: number;
  qtd: number;
  unidade_de_medida: string;
}

const UpdateOrcamento: React.FC = () => {
  const [orcamentoItens, setOrcamentoItens] = useState<OrcamentoItem[]>([]);

  useEffect(() => {
    axios
      .get("https://role-mandave.vercel.app/listarOrcamento")
      .then((response) => {
        console.log("Dados da API:", response.data);

        if (Array.isArray(response.data.selectOrcamento)) {
          setOrcamentoItens(response.data.selectOrcamento);
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
                <td>{item.valor}</td>
                {/* <td>{item.qtd}</td> */}
                <td>
                  {item.unidade_de_medida === "Diaria" ||
                  item.unidade_de_medida === "Un"
                    ? Number(item.qtd)
                    : String(item.qtd)}
                </td>
                <td>
                  <button onClick={() => handleEditItem(item.id)}>✏️</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteItem(item.id)}>🗑️</button>
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
