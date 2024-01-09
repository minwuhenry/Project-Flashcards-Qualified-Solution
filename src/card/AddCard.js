import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

export const AddCard = () => {
  const { deckId } = useParams();
  const initialState = {
    front: "",
    back: "",
  };
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({ ...initialState });
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    if (deckId) {
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
    }
  }, [deckId]);

  const changeHandler = (event) => {
    setCard({ ...card, [event.target.name]: event.target.value });
  };
  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    createCard(deckId, card, abortController.signal)
      .then((response) => {
        setCard(initialState);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("An error occurred:", error);
        }
      });
  };

  if (deck.name) {
    return (
      <section className="container">
        <NavBar deck={deck} />
        <h1>{`${deck.name}: Add Card`}</h1>
        <CardForm
          card={card}
          changeHandler={changeHandler}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
        />
      </section>
    );
  } else {
    return null;
  }
};
export default AddCard;
