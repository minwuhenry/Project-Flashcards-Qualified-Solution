import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

export const EditCard = () => {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [error, setError] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("An error occurred:", error);
        }
      });
    return () => abortController.abort();
  }, [deckId]);

  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal).then(setCard).catch(setError);
    return () => abortController.abort();
  }, [cardId]);

  const changeHandler = (event) => {
    setCard({ ...card, [event.target.name]: event.target.value });
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateCard(card, abortController.signal)
      .then((response) => {
        history.push(`/decks/${deckId}`);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("An error occurred:", error);
        }
      });
  };

  if (error) {
    return <p style={{ color: "red" }}>ERROR: {error.message}</p>;
  } else {
    return (
      <section className="container">
        <NavBar deck={deck} />
        <h1>Edit Card</h1>
        <CardForm
          card={card}
          changeHandler={changeHandler}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        />
      </section>
    );
  }
};
export default EditCard;
