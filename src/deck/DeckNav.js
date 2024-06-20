import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import AddCard from "../card/AddCard";
import EditCard from "../card/EditCard";
import NotFound from "../Layout/NotFound";

function DeckNav() {
  const { path } = useRouteMatch();
  return (
    <section>
      <Switch>
        <Route exact path={path}>
          <Deck />
        </Route>
        <Route path={`${path}/cards/:cardId/edit`}>
          <EditCard />
        </Route>
        <Route path={`${path}/cards/new`}>
          <AddCard />
        </Route>
        <Route path={`${path}/edit`}>
          <EditDeck />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </section>
  );
}
export default DeckNav;
