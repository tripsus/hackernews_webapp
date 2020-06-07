import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history'
import PostListPageView from './view/MainPage'
import CommentPageView from './view/CommentPage'

function Routes(){
    return(
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={PostListPageView}/>
                <Route path="/comments" exact component={CommentPageView}/>
            </Switch>
        </Router>
    );
}

export default Routes;