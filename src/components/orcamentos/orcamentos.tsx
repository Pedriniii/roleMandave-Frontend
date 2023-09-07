import React, { useState } from "react";
import './orcamentos.css'

function Orcamentos() {
  const [description, setDescription] = useState("");
  const [unitOfMeasure, setUnitOfMeasure] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState<
    Array<{
      description: string;
      unitOfMeasure: string;
      quantity: number;
      price: number;
    }>
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description && unitOfMeasure && quantity && price) {
      const newItem = {
        description,
        unitOfMeasure,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
      };
      setItems([...items, newItem]);
      setDescription("");
      setUnitOfMeasure("");
      setQuantity("");
      setPrice("");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Descrição</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="unitOfMeasure">Unidade de Medida</label>
        <input
          type="text"
          id="unitOfMeasure"
          value={unitOfMeasure}
          onChange={(e) => setUnitOfMeasure(e.target.value)}
          required
        />

        <label htmlFor="quantity">QTD</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <label htmlFor="price">Preço</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <button type="submit" className="btn">
          Adicionar Item
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Descrição</th>
            <th style={{ width: "15%" }}>Total</th>
            <th style={{ width: "15%" }}>Preço</th>
            <th style={{ width: "10%" }}>UN</th>
            <th style={{ width: "10%" }}>QTD</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.unitOfMeasure}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orcamentos;
