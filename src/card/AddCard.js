import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import NavBar from "../Layout/NavBar";
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

  const getDeck = async () => {
    const data = await readDeck(deckId);
    setDeck(data);
  };
  useEffect(() => {
    getDeck();
    // readDeck(deckId).then((response) => setDeck(response)).catch(setError);
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
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active">Add Card</li>
          </ol>
        </nav>
        <h2>{`${deck.name}: Add Card`}</h2>
        <form name="addCard" onSubmit={handleSubmit}>
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
