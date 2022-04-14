import React from 'react'
import { useRouteMatch, Route, Redirect } from 'react-router-dom';

import SubPageRenderer from '../sub-page-renderer';


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


