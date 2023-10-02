import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './body.css'; 
interface ExtratoRecebimento {
  nome: string;
  valor_pago: string;
  data_recebimento: string;
}

const MonthCalendar = () => {
  const currentMonth = new Date().getMonth(); 
  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const [pagamentos, setPagamentos] = useState<ExtratoRecebimento[]>([]);

  useEffect(() => {
    Axios.get('https://role-mandave.vercel.app/extratoRecebimentos')
      .then((response) => {
        if (Array.isArray(response.data.extratoRecebimento)) {
          setPagamentos(response.data.extratoRecebimento);
        } else {
          console.error('Os dados recebidos não são um array:', response.data.extratoRecebimento);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });
  }, []);

  const getStatusIcon = (nome: string) => {
    const pagamento = pagamentos.find((p) => p.nome === nome && new Date(p.data_recebimento).getMonth() === currentMonth);
    if (pagamento) {
      
      return <span style={{ color: 'green' }}>✔</span>;
    } else {
      
      return <span style={{ color: 'red' }}>❌</span>;
    }
  };

  return (
    <div className="month-calendar">
      {monthNames.map((month, index) => {
        const isPastMonth = index < currentMonth;
        const isCurrentMonth = index === currentMonth;
        const classNames = isPastMonth ? 'month past-month' : 'month' && isCurrentMonth ? 'month current-month' : 'month';
        return (
          <div className={'monthDistribuition'}>
          <div key={month} className={classNames}>
            {month} - {getStatusIcon('Alice')}
          </div>
          </div>
        );
      })}
    </div>
  );
};

export default MonthCalendar;
