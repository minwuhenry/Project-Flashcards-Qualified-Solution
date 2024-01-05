import React, { useEffect, useState } from "react";
import {
  useRouteMatch,
  useParams,
  useHistory,
} from "react-router-dom";
import { deleteCard, readDeck } from "../utils/api";
import NavBar from "./NavBar";

export const Deck = () => {
  const [deck, setDeck] = useState({ cards: [] });
  const [error, setError] = useState(undefined);
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  const history = new useHistory();

  const fetchDeck = () => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
    return () => abortController.abort();
  };
  useEffect(() => {
    fetchDeck();
  }, [deckId]);

  const handleDelete = async (id) => {
    const abortController = new AbortController();
    const result = window.confirm(
      "Delete this card?\nYou will not be able to recover it."
    );
    if (result) {
      await deleteCard(id, abortController.signal);
      fetchDeck();
    }
  };

  const cardList = deck.cards.map((card, index) => (
    <div className="border p-4 h-100 d-flex flex-column align-self-stretch">
      <div className="name" key={index}>
        <div className="item-left">
          <p>{card.front}</p>
        </div>
        <div className="item-right">
          <p>{card.back}</p>
        </div>
      </div>
      <div className="item-right">
        <button
          type="button"
          onClick={() => history.push(`${url}/cards/${card.id}/edit`)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDelete(card.id)}>
          Delete
        </button>
      </div>
    </div>
  ));

  if (error) {
    return <p style={{ color: "red" }}>ERROR: {error.message}</p>;
  } else {
    return (
      <section className="container">
        <NavBar text={deck.name} />
        <div
          className="border p-4 h-100 d-flex flex-column align-self-stretch"
          key={deck.id}
        >
          <h2>{deck.name}</h2>
          <p>{deck.description}</p>
          <div className="deckActions">
            <button type="button">Study</button>
          </div>
          <h2>Cards</h2>
          <div>{cardList}</div>
        </div>
      </section>
    );
  }
};
export default Deck;