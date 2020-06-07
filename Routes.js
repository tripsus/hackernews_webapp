import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history'
import PostListPageView from './view/MainPage'

function Routes(){
    return(
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={PostListPageView}/>
            </Switch>
        </Router>
    );
}

export default Routes;