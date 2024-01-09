import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import { readDeck, updateDeck } from "../utils/api";

export const EditDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
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

  const changeHandler = (event) => {
    setDeck({ ...deck, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    updateDeck(deck, abortController.signal)
      .then((response) => { 
        history.push(`/decks/${deckId}`)})
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
        <h1>Edit Deck</h1>
        <form name="editDeck" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
          </div>
          <div>
            <input className="form-control form-control-lg"
              id="name"
              type="text"
              name="name"
              onChange={changeHandler}
              value={deck.name}
            />
          </div>
          <br />
          <div>
            <label htmlFor="description">Description</label>
          </div>
          <div>
            <textarea className="form-control form-control-lg"
              id="description"
              name="description"
              onChange={changeHandler}
              value={deck.description}
            />
          </div>
          <br />
          <button
            className="btn btn-secondary mx-1"
            type="button"
            onClick={() => history.push(`/decks/${deckId}`)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary mx-1">Submit</button>
        </form>
      </section>
    );
  }else {
    return <p>Loading ...</p>
  }
};
export default EditDeck;
