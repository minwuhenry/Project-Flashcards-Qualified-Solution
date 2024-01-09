import React, { useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";
import TrashCanIcon from "../Layout/trash.svg";

export const DeckList = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);
  const history = useHistory();

  const fetchDecks = () => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks).catch(setError);
    return () => abortController.abort();
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  const handleDelete = async (id) => {
    const abortController = new AbortController();
    const result = window.confirm(
      "Delete this deck? \n You will not be able to recover it"
    );

    if (result) {
      await deleteDeck(id, abortController.signal);
      fetchDecks();
    }
  };

  if (error) {
    return <p style={{ color: "red" }}>ERROR: {error.message}</p>;
  } else {
    const list = decks.map((deck) => (
      <div className="container" key={deck.id}>
        <div className="card w-75 mb-3">
          <div className="card-body">
            <div className="row">
              <h2 className="card-title col">{deck.name}</h2>
              <p className="card-text text-right col">
                {deck.cards.length} cards
              </p>
            </div>
            <p className="card-text">{deck.description}</p>
            <div className="row">
              <button
                type="button"
                className="btn btn-secondary mx-1"
                onClick={() => history.push(`/decks/${deck.id}`)}
              >
                View
              </button>
              <button
                type="button"
                className="btn btn-primary mx-1"
                onClick={() => history.push(`/decks/${deck.id}/study`)}
              >
                Study
              </button>
              <button
                type="button"
                className="btn btn-danger mx-1"
                onClick={() => handleDelete(deck.id)}
              >
                <img src={TrashCanIcon} alt="Delete" />
              </button>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="container">
        <NavLink to="/decks/new">
          <button type="button" className="btn btn-secondary my-3">
            Create Deck
          </button>
        </NavLink>
        <section className="row">{list}</section>
      </div>
    );
  }
};

export default DeckList;
