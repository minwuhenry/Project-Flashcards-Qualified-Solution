import React, {useState, useEffect} from "react";
import { Route, Switch, useHistory, useRouteMatch, useParams } from "react-router-dom";
import Deck from "./Deck";
import EditDeck from "./EditDeck";

function DeckNav() {
    const {path} = useRouteMatch();
    return (
        <>
          <Switch>
            <Route exact path={path}>
              <Deck />
            </Route>
            <Route path="/decks/:deckId/edit">
              <EditDeck />
            </Route>
          </Switch>
        </>
      );

}
export default DeckNav;