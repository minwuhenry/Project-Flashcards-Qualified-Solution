import React, { useState, useEffect } from "react";
import {useParams,Link,} from "react-router-dom";
import { readDeck } from "../utils/api";
import FlipCards from "./FlipCards";

export const Study = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    if (deckId) {
      readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
      return () => abortController.abort();
    }
  }, [deckId]);

  return (
    <section className="container">
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active">Study</li>
        </ol>
      </nav>
      <div className="border p-4 h-100 d-flex flex-column align-self-stretch">
        <h2>Study: {deck.name}</h2>
        <FlipCards cards={deck.cards} />
      </div>
    </section>
  );
};
export default Study;
