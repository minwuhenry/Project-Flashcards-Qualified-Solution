import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "../deck/NavBar";
import { readDeck, readCard, updateCard } from "../utils/api";

export const EditCard = () => {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [error, setError] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateCard(card, abortController.signal)
      .then((response) => { 
        console.log("response: ", response);
        history.push(`/decks/${deckId}`)})
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
        <NavBar text={`${deck.name} / Edit Card ${card.id}`} />
        <h2>Edit Card</h2>
        <form name="editCard" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="front">Front</label>
          </div>
          <div>
            <textarea
              id="front"
              type="text"
              name="front"
              onChange={changeHandler}
              value={card.front}
            />
          </div>
          <br />
          <div>
            <label htmlFor="back">Back</label>
          </div>
          <div>
            <textarea
              id="back"
              name="back"
              onChange={changeHandler}
              value={card.back}
            />
          </div>
          <br />
          <button
            type="button"
            onClick={() => history.push(`/decks/${deckId}`)}
          >
            Cancel
          </button>
          <button type="submit">Submit</button>
        </form>
      </section>
    );
  }
};
export default EditCard;
