import React from 'react'
import { useRouteMatch, Route, Redirect } from 'react-router-dom';

import SubPageRenderer from '../sub-page-renderer';


export default function ViewPage() {

    let match = useRouteMatch();
    console.log(match)

    //there's no subcomponent to render 
    if (match.isExact) {
        return (
            <Redirect to="/404" />
        )
    }
    return (
        <div className="page page-view">
            <Route path={`${match.path}/:subcomponent/:id`} component={SubPageRenderer} />
        </div>
    );

}


