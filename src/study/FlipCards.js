import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function FlipCards({ cards = [] }) {
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);
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
      <div className="card w-100 mb-3">
        <div className="card-body">
          <h3 className="card-text">
            card {index + 1} of {cardCount}
          </h3>

          {flipped ? (
            <p className="card-text">{cards[index].back}</p>
          ) : (
            <p className="card-text">{cards[index].front}</p>
          )}
          <div className="row">
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
      </div>
    );
  } else {
    return null;
  }
}
export default FlipCards;
