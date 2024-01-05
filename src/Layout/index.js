import React from "react";
import { Route, Switch, Link, NavLink } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../home/DeckList";
import Deck from "../deck/Deck";
import CreateDeckForm from "../deck/CreateDeckForm";
import EditCard from "../card/EditCard";

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
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
