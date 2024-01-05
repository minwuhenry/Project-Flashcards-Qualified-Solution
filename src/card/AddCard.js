import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "../deck/NavBar";
import { readDeck, createCard } from "../utils/api";

export const AddCard = () => {
  const { deckId } = useParams();
  const initialState = {
    front: "",
    back: "",
  };
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({ ...initialState });
  const [error, setError] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck).catch(setError);
    // const abortController = new AbortController();
    // if(deckId){
    // readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
    // return () => abortController.abort();
    // }
  }, [deckId]);

  const changeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    createCard(deckId, formData, abortController.signal)
      .then((response) => {
        setFormData(initialState);
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
        <NavBar text="Add Card" />
        
        <form name="addCard" onSubmit={handleSubmit}>
        <h2>{deck.name}: Add Card</h2>
          <div>
            <label htmlFor="front">Front</label>
          </div>
          <div>
            <textarea
              id="front"
              type="text"
              name="front"
              onChange={changeHandler}
              value={formData.front}
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
              value={formData.back}
            />
          </div>
          <br />
          <button
            type="button"
            onClick={() => history.push(`/decks/${deckId}`)}
          >
            Done
          </button>
          <button type="submit">Save</button>
        </form>
      </section>
    );
  } else {
    return null;
  }
};
export default AddCard;
