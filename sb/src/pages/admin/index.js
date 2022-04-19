import React from 'react';
import { cookies } from '../../index'
import { Redirect, Link, Route, useRouteMatch } from 'react-router-dom';
import SubPageRenderer from '../sub-page-renderer';


export default function AdminPage() {
    const token = cookies.get('token')
    let match = useRouteMatch();


    if (!token)
        return <Redirect to='/lk' />


    //there's no subcomponent to render 
    if (match.isExact) {
        return (
            <div className="page page-admin">
                <Link to='/admin/newPost?type=homework'>Домашняя работа</Link>
                <Link to='/admin/newPost?type=news'>Новости</Link>
                <Link to='/admin/subjects'>Предметы</Link>
            </div>
        )
    }
    return (
        <Route path={`${match.path}/:subcomponent`} component={SubPageRenderer} />
    );


}

