import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { ReactComponent as MarkIcon } from '../../../assets/img/actions/mark.svg'
import { ReactComponent as MarkedIcon } from '../../../assets/img/actions/marked.svg'

export default function MarkAsDone({ newsCardId, __isMarkAsDone: isMarked, type }) {
    const [mark, setMark] = useState(isMarked || false)
    const handleMark = () => {
        setMark(!mark)
    }
    return (
        <div className="action action_markAsDone">

            <button type='button' onClick={handleMark}>
                <SwitchTransition mode='out-in'>
                    <CSSTransition
                        key={mark}
                        timeout={200}
                        classNames="fade_mark"
                    >
                        {mark ? <MarkIcon /> : <MarkedIcon />}
                    </CSSTransition>
                </SwitchTransition>
            </button>

        </div>
    )
}