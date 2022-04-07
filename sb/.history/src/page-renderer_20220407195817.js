import React from 'react';
import { useRouteMatch, Redirect } from 'react-router-dom'

const generatePage = page => {
    const component = () => require(`./pages/${page}`).default

    try {
        return React.createElement(component())
    } catch (err) {
        console.warn(err)
        //return React.createElement(() => <Redirect to="/404" />)
    }
}

export default function PageRenderer() {
    const {
        params: { page },

    } = useRouteMatch()

    return generatePage(page)
}