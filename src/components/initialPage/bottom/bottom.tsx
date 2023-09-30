import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { format } from 'date-fns';
import './bottom.css';

interface ExtratoRecebimento {
  nome: string;
  valor_pago: string;
  data_recebimento: string;
}

function Recebimentos() {
  const [extratoRecebimento, setExtratoRecebimento] = useState<ExtratoRecebimento[]>([]);

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
  }, []);

  const formatDate = (date: string) => {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy');
    return formattedDate;
  };

  return (
    <div className={'bottomMain'}>
      {extratoRecebimento.map((item, index) => (
        <div key={index} className={'containerPaymants'}>
          <div className={'paymants'}>
            <span>🤑 - </span>
            <div>
              {/* <span>Pagamento recebido - </span> */}
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
