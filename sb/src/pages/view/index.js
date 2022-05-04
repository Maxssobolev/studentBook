import React from 'react'
import { useRouteMatch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";

import SubPageRenderer from '../sub-page-renderer';

export const history = createBrowserHistory({ forceRefresh: true })

export default function ViewPage() {

    let match = useRouteMatch();

    //there's no subcomponent to render 
    if (match.isExact) {
        return (
            <Redirect to="/404" />
        )
    }
    return (


        <Route path={`${match.path}/:subcomponent/:id`} component={SubPageRenderer} />



    );

}


