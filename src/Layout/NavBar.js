import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function NavBar({ deck = {} }) {
  const params = useParams();
  const cardId = params.cardId;
  return (
    <Switch>
      <Route exact path="/decks/new">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Create Deck</li>
          </ol>
        </nav>
      </Route>
      <Route exact path="/decks/:deckId">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home </Link>
            </li>
            <li className="breadcrumb-item active">{deck.name}</li>
          </ol>
        </nav>
      </Route>
      <Route exact path="/decks/:deckId/study">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active">Study</li>
          </ol>
        </nav>
      </Route>
      <Route exact path="/decks/:deckId/cards/new">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active">Add Card</li>
          </ol>
        </nav>
      </Route>
      <Route exact path="/decks/:deckId/edit">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active">Edit Deck</li>
          </ol>
        </nav>
      </Route>
      <Route exact path="/decks/:deckId/cards/:cardId/edit">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active">Edit Card {cardId}</li>
          </ol>
        </nav>
      </Route>
    </Switch>
  );
}
export default NavBar;
