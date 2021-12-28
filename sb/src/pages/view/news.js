import React from 'react';
import { useRouteMatch } from 'react-router-dom'

export default function NewsViewPage() {
    let match = useRouteMatch();
    const ID = match.params.id

    return (
        <div>
            news {ID}
        </div>
    )
}