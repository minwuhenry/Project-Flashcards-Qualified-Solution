import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import FlipCards from "./FlipCards";
import NavBar from "../Layout/NavBar";

export const Study = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    if (deckId) {
      readDeck(deckId, abortController.signal)
        .then((response) => {
          setDeck(response);
          setCards(response.cards);
        })
        .catch(setError);
      return () => abortController.abort();
    }
  }, [deckId]);

  if (deck.name) {
    return (
      <section className="container">
        {console.log("deck", {deck})}
        <NavBar deck={deck} />
        <div className="border p-4 h-100 d-flex flex-column align-self-stretch">
          <h1>Study: {deck.name}</h1>
          {cards && cards.length > 2 ? (
            <FlipCards cards={deck.cards} />
          ) : (
            <div>
              <h2>Not enough cards</h2>
              <p>
                You need at least 3 cards to study. There are{" "}
                {deck.cards.length} in this deck
              </p>
              <button
                type="button"
                onClick={() => history.push(`/decks/${deckId}/cards/new`)}
              >
                Add Cards
              </button>
            </div>
          )}
        </div>
      </section>
    );
  } else {
    return <p>Loading...</p>;
  }
};
export default Study;
