import React from "react";
import { Route,Switch,useRouteMatch } from "react-router-dom";
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import AddCard from "../card/AddCard";
import EditCard from "../card/EditCard";

function DeckNav() {
  const { path } = useRouteMatch();
  return (
    <>
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
      </Switch>
    </>
  );
}
export default DeckNav;
