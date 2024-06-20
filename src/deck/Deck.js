import React, { useEffect, useState, useCallback } from "react";
import {
  useRouteMatch,
  useParams,
  useHistory,
  NavLink,
  Link,
} from "react-router-dom";
import { deleteCard, readDeck, deleteDeck } from "../utils/api";
import NavBar from "../Layout/NavBar";
import TrashCanIcon from "../Layout/trash.svg";

export const Deck = () => {
  const [deck, setDeck] = useState({ cards: [] });
  const [error, setError] = useState(undefined);
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  const history = new useHistory();

  const fetchDeck = useCallback(() => {
      const abortController = new AbortController();
      readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
      return () => abortController.abort();
    }, [deckId]);

    useEffect(() => {
      fetchDeck();
    }, [fetchDeck]);

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
    <div className="card w-100 mb-3" key={index}>
      <div className="card-body">
        <div className="row">
          <p className="card-title col">{card.front}</p>
          <p className="card-text text-right col">{card.back}</p>
        </div>
        <div className="row">
          <div className="card-text text-right col">
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
              <img src={TrashCanIcon} alt="Delete" />
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  if (error) {
    return <p style={{ color: "red" }}>ERROR: {error.message}</p>;
  } else {
    return (
      <section className="container">
        <NavBar deck={deck} />

        <h1>{deck.name}</h1>
        <p>{deck.description}</p>
        <div className="row">
          <div className="card-title col">
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
          </div>
          <div className="card-text text-right col">
            <button
              type="button"
              className="btn btn-danger mx-1"
              onClick={() => handleDeckDelete()}
            >
              <img src={TrashCanIcon} alt="Delete" />
            </button>
          </div>
        </div>
        <br />
        <div>
          <h2>Cards</h2>
          {cardList}
        </div>
      </section>
    );
  }
};
export default Deck;
