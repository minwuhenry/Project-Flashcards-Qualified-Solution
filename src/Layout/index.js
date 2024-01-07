import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../home/DeckList";
import CreateDeckForm from "../deck/CreateDeckForm";
import Study from "../study/Study"
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
          <Route path="/decks/new">
            <CreateDeckForm />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId">
            <DeckNav />
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
