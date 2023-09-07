import React from 'react';
import './transactionForm.css'


const TransactionForm: React.FC = () => {
  return (
    <div className={"container"}>
      <h2>Adicionar Transação</h2>
      <form>
          <div className={"form-group"}>
          <label htmlFor="quemPagou">Quem pagou:</label>
          <select className="form-control" id="porOndePagou">
            <option value="0" disabled selected>Selecione alguem</option>
            <option value="pedrinsky">Pedrinsky</option>
            <option value="gordine">Gordine</option>
            <option value="gadac">Gadac</option>
          </select>
          </div>
        <div className={"form-group"}>
          <label htmlFor="valorPago">Valor pago:</label>
          <input type="number" className="form-control" id="valorPago" placeholder="Valor em reais" />
        </div>
        <div className={"form-group"}>
          <label htmlFor="quandoPagou">Data do pagamento:</label>
          <input type="date" className="form-control" id="quandoPagou" />
        </div>
        <div className={"form-group"}>
          <label htmlFor="porOndePagou">Forma de pagamento:</label>
          <select className="form-control" id="porOndePagou">
            <option value="0" disabled selected>Selecione a Forma de pagamento</option>
            <option value="Nubank">Nubank</option>
            <option value="Picpay">Picpay</option>
            <option value="Bradesco">Bradesco</option>
            <option value="Caixa">Caixa</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </div>
        <button type="submit" className={"btn"}>Adicionar Pagamento</button>
      </form>

      <table>
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Pessoa</th>
            <th style={{ width: "15%" }}>Total pago</th>
            <th style={{ width: "10%" }}>Total a pagar</th>
          </tr>
        </thead>

        <tbody>
            <tr>
              <td>Pedrinsky</td>
              <td>800</td>
              <td>200</td>
            </tr>
            <tr>
              <td>Gordine</td>
              <td>0</td>
              <td>1000</td>
            </tr>
            <tr>
              <td>Gadac</td>
              <td>0</td>
              <td>0</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionForm;
