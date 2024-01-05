import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../home/DeckList";
import Deck from "../deck/Deck";
import CreateDeckForm from "../deck/CreateDeckForm";
import EditCard from "../card/EditCard";
import Study from "../study/Study"
import EditDeck from "../deck/EditDeck";
import AddCard from "../card/AddCard";
import DeckNav from "../deck/DeckNav";

function Layout() {
  return (
    <>
      <Header />
      
      <div className="container">
        {/* TODO: Implement the screen starting here */}
       
        
        <Switch>
          <Route exact={true} path="/">
            <DeckList />
          </Route>
          <Route exact={true} path="/decks/new">
            <CreateDeckForm />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact={true} path="/decks/:deckId">
            <DeckNav />
          </Route>
          {/* <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route> */}
          {/*<Route path="/decks/:deckId">
            <Deck />
          </Route> */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
