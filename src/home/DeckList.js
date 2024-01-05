import React, { useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

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
      <div className="container">
        <div className="name" key={deck.id}>
          <div className="item-left">
            <h2>{deck.name}</h2>
          </div>
          <div className="right-left">
            <p className="item-righ">{deck.cards.length} cards</p>
          </div>
        </div>
        <p>{deck.description}</p>
        <div className="deckActions">
          <button
            type="button"
            onClick={() => history.push(`/decks/${deck.id}`)}
          >
            View
          </button>
          <button type="button" onClick={() => handleDelete(deck.id)}>
            Delete
          </button>
        </div>
      </div>
    ));

    return (
      <div className="container">
         <NavLink to="/decks/new">
            <button type="button">Create Deck</button>
        </NavLink>
        <section className="row">{list}</section>
      </div>
    );
  }
};

export default DeckList;
