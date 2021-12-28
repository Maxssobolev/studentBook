import React from 'react';
import { useRouteMatch } from 'react-router-dom'

export default function HomeworkViewPage() {
    let match = useRouteMatch();
    const ID = match.params.id

    return (
        <div>
            hw {ID}
        </div>
    )
}