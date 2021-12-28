import React from 'react';
import { useRouteMatch, Redirect } from 'react-router-dom'

//Ищет в папке /pages папку с названием страницы, а уже в этой папке - файл, с названием компонента

const generatePage = (page, subcomponent) => {
    const component = () => require(`./${page}/${subcomponent}`).default

    try {
        return React.createElement(component())
    } catch (err) {
        console.warn(err)
        return React.createElement(() => <Redirect to="/404" />)
    }
}

export default function PageRenderer() {

    const {
        params: { page, subcomponent },

    } = useRouteMatch()

    return generatePage(page, subcomponent)
}