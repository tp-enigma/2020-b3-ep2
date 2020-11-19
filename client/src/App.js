import React, { useState } from "react";
import "./App.css";

const App = () => {
  let transactions =
    localStorage.getItem("transactions") !== null
      ? JSON.parse(localStorage.getItem("transactions"))
      : [];

  const [nom, setNom] = useState("");
  const [montant, setMontant] = useState("");

  const amounts = transactions.map((transaction) =>
    parseInt(transaction.montant)
  );
  const total = amounts.reduce((acc, item) => (acc += item), 0);
  const income =
    amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2) || 0;
  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -(1).toFixed(2);

  const onSubmit = (e) => {
    e.preventDefault();
    transactions.push({ nom: nom, montant: montant, id: generateID() });
    updateLocalStorage();
    init();
  };

  const init = () => {
    setNom("");
    setMontant("");
  };

  const generateID = () => {
    return Math.floor(Math.random() * 100000000);
  };

  const updateLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  };

  const removeTransaction = (item) => {
    const index = transactions.indexOf(item);
    if (index > -1) transactions.splice(index, 1);
    updateLocalStorage();
    window.location.reload(false);
  };

  return (
    <div className="container-fluid">
      <div className="container-expense">
        <h1>Expense Tracker</h1>
        <h4>Votre solde</h4>
        <h1 id="balance">{total}€</h1>

        <div className="inc-exp-container">
          <div>
            <h4>Revenus</h4>
            <p id="money-plus" className="money plus">
              +{income}€
            </p>
          </div>
          <div>
            <h4>Dépenses</h4>
            <p id="money-minus" className="money minus">
              -{expense}€
            </p>
          </div>
        </div>
        <h3>Ajouter un transaction</h3>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Nom</label>
            <input
              type="text"
              id="text"
              className="form-control"
              placeholder="Ex: Loyer"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">
              Montant <br />
              (+ pour revenus, - pour dépenses)
            </label>
            <input
              type="input"
              id="amount"
              className="form-control"
              placeholder="Ex: +200 ou -500"
              value={montant}
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
          <div className="d-flex flex-row justify-content-around my-1">
            {transaction.nom} : {transaction.montant} €
            <button
              onClick={() => removeTransaction(transaction)}
              className="btn btn-sm btn-danger ml-auto"
            >
              {" "}
              X{" "}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
