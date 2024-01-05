import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import NavBar from "./NavBar";

export const CreateDeckForm = () => {
  const history = useHistory();
  const initialState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    createDeck(formData, abortController.signal)
      .then((response) => {
        history.push(`/decks/${response.id}`);
      })

      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("An error occurred:", error);
        }
      });
  };

  return (
    <section className="container">
      <NavBar text="Create Deck" />
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <br />
        <div>
          <label htmlFor="description">description</label>
        </div>
        <div>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </div>
        <br />
        <button type="button" onClick={() => history.push("/")}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};
export default CreateDeckForm;
