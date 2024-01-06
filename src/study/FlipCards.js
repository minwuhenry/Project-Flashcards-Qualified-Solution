import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function FlipCards({ cards = [] }) {
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
  const handleFlip = () => {};
  const cardCount = cards.length;
  const history = useHistory();

  const handleNext = () => {
    if (index === cardCount - 1) {
      restartPrompt();
    } else {
      setFlipped(false);
      setIndex((currentIndex) => currentIndex + 1);
    }
  };

  const restartPrompt = () => {
    const prompt = window.confirm(
      "Restart cards?\nClick 'cancel' to return to the home page ."
    );
    if (prompt) {
      setFlipped(false);
      setIndex(0);
    } else {
      history.push("/");
    }
  };
  if (cardCount > 0) {
    return (
      <div className="border p-4 h-100 d-flex flex-column align-self-stretch">
        <h3>
          card {index + 1} of {cardCount}
        </h3>
        <div>
          {flipped ? <p>{cards[index].back}</p> : <p>{cards[index].front}</p>}
          <button type="button" onClick={() => setFlipped(!flipped)}>
            flip
          </button>
          {flipped && (
            <button type="button" onClick={() => handleNext()}>
              next
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
}
export default FlipCards;
