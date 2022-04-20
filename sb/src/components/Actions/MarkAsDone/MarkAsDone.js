import React, { useState, useEffect } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { ReactComponent as MarkIcon } from '../../../assets/img/actions/mark.svg'
import { ReactComponent as MarkedIcon } from '../../../assets/img/actions/marked.svg'
import { $authHost } from '../../../http';

export default function MarkAsDone({ id, isDone }) {
    const [mark, setMark] = useState(isDone || false)
    const handleMark = async () => {
        $authHost.post('/api/homeworks/done', { postId: id }).then(r => setMark(!mark))
    }
    useEffect(() => {
        setMark(isDone)
    }, [isDone])
    return (
        <div className="action action_markAsDone">

            <button type='button' onClick={handleMark}>
                <SwitchTransition mode='out-in'>
                    <CSSTransition
                        key={mark}
                        timeout={200}
                        classNames="fade_mark"
                    >
                        {mark ? <MarkedIcon /> : <MarkIcon />}
                    </CSSTransition>
                </SwitchTransition>
            </button>

        </div>
    )
}