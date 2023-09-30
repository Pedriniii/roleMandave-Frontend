import  './header.css'
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { getMonth, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface SaldoEmConta{
    id: number;
    sum: number;
}

interface OrcamentoTotal{
    id:number;
    sum: number;
}


const Header: React.FC =  () => {
    const [saldoEmConta, setSaldoEmConta] = useState<SaldoEmConta[]>([]);

    useEffect(() => {
        Axios.get('https://role-mandave.vercel.app/saldoEmConta')
          .then((response) => {
            console.log('Resposta da requisição:', response.data);
    
            if (Array.isArray(response.data.saldoEmConta)) {
              setSaldoEmConta(response.data.saldoEmConta);
            } else {
              console.error('Os dados recebidos não são um array:', response.data.selectRecebimento);
            }
          })
          .catch((error) => {
            console.error('Erro ao buscar os dados:', error);
          });
      }, []);

      const saldoTotal = saldoEmConta.map((saldo) =>(
        <h2 key = {saldo.id}>R$ {saldo.sum}</h2>
      ))

      const [orcamentoTotal, setOrcamentoTotal] = useState<OrcamentoTotal[]>([]);

      useEffect(() => {
        Axios.get('https://role-mandave.vercel.app/orcamentoTotal')
          .then((response) => {
            console.log('Resposta da requisição:', response.data);
    
            if (Array.isArray(response.data.orcamentoTotal)) {
              setOrcamentoTotal(response.data.orcamentoTotal);
            } else {
              console.error('Os dados recebidos não são um array:', response.data.orcamentoTotal);
            }
          })
          .catch((error) => {
            console.error('Erro ao buscar os dados:', error);
          });
      }, []);

      const orcamento = orcamentoTotal.map((orcamento) =>(
        <p key = {orcamento.id}>R$ {orcamento.sum}</p>
      ))

      const orcamentoTotalSum = orcamentoTotal.reduce((total, item) => total + item.sum, 0);
      const saldoEmContaSum = saldoEmConta.reduce((total, item) => total + item.sum, 0);
      
      const aReceber = orcamentoTotalSum - saldoEmContaSum;

    const currentMonth = getMonth(new Date());
    let monthName = format(new Date(0, currentMonth), 'MMMM', { locale: ptBR });

    
    monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    return(
    <div className={"headerMain"}>
        <h3 className={"mesAtual"}>{monthName}</h3>

        <div className={"saldoAtual"}>
            <p>Saldo em conta</p>
            {saldoTotal}
        </div>

        <div className={"despesasReceitas"}>
            <div className={"containerReceitas"}>
                <span>👍</span>
                <div className={"align"}>
                    <span>Orçamento</span>
                    {orcamento}
                </div>
            </div>

            <div className={"containerReceitas"}>
                <span>😢</span>
                <div className={"align"}>
                    <span>A receber</span>
                    <p>R$ {aReceber}</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Header;