import React, { useEffect, useState } from "react";
import {
  useRouteMatch,
  useParams,
  useHistory,
  NavLink,
  Link,
} from "react-router-dom";
import { deleteCard, readDeck, deleteDeck } from "../utils/api";
import NavBar from "../Layout/NavBar";

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

  const handleCardDelete = async (id) => {
    const abortController = new AbortController();
    const result = window.confirm(
      "Delete this card?\nYou will not be able to recover it."
    );
    if (result) {
      await deleteCard(id, abortController.signal);
      fetchDeck();
    }
  };

  const handleDeckDelete = async () => {
    const abortController = new AbortController();
    const result = window.confirm(
      "Delete this deck?\nYou will not be able to recover it."
    );
    if (result) {
      await deleteDeck(deckId, abortController.signal);
      history.push("/");
    }
  };

  const cardList = deck.cards.map((card, index) => (
    <div
      className="border p-4 h-100 d-flex flex-column align-self-stretch"
      key={index}
    >
      <div className="name" key={index}>
        <div className="item-left">
          <p>{card.front}</p>
        </div>
        <div className="item-right">
          <p>{card.back}</p>
        </div>
      </div>
      <div className="item-right">
        <NavLink to={`${url}/cards/${card.id}/edit`}>
          <button type="button" className="btn btn-secondary mx-1">
            Edit
          </button>
        </NavLink>
        <button
          type="button"
          className="btn btn-danger mx-1"
          onClick={() => handleCardDelete(card.id)}
        >
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
            <Link to={`${url}/edit`}>
              <button type="button" className="btn btn-secondary mx-1">
                Edit
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-primary mx-1"
              onClick={() => history.push(`${url}/study`)}
            >
              Study
            </button>
            <button
              type="button"
              className="btn btn-primary mx-1"
              onClick={() => history.push(`${url}/cards/new`)}
            >
              Add Cards
            </button>
            <button
              type="button"
              className="btn btn-danger mx-1"
              onClick={() => handleDeckDelete()}
            >
              Delete
            </button>
          </div>
          <br />
          <h2>Cards</h2>
          <div>{cardList}</div>
        </div>
      </section>
    );
  }
};
export default Deck;
