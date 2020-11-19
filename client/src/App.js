import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [nom, setNom] = useState("");
  const [montant, setMontant] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setTransactions((prevState) => [
      ...prevState,
      { nom: nom, montant: montant },
    ]);
  };

  return (
    <div className="container-fluid w-75 py-2">
      <h1>Expense Tracker</h1>
      <h3>Ajouter un transaction</h3>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Nom</label>
          <input
            type="text"
            id="text"
            className="form-control"
            placeholder="Ex: Loyer"
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Montant</label>
          <input
            type="text"
            id="amount"
            className="form-control"
            placeholder="Ex: +200 ou -500"
            onChange={(e) => setMontant(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </form>

      <h3>Historique</h3>
      <p>{transactions.length} transaction(s) au total</p>
      {transactions.map((transaction) => (
        <p>
          {transaction.nom} : {transaction.montant} €
        </p>
      ))}
    </div>
  );
};

export default App;
