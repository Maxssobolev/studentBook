import React from 'react';
import { ReactComponent as RightArrow } from '../../assets/img/arrow-right.svg';
import { TEXT } from '../../config/text/text';


export default function Button({ type, text, __class, handler }) {
    let modifyClass = '';
    switch (type) {
        case 'readmore':
            text = text || TEXT.button.readmore
            break;
        case 'showmore':
            modifyClass = 'blue'
            text = text || TEXT.button.showmore
            break;
        default:
            break;
    }
    return (
        <button
            type="button"
            className={`button button_${modifyClass} ${__class || ''}`}
            {...(
                handler ? { onClick: handler } : null
            )}
        >
            {text}
            {type === 'readmore' && <RightArrow />}
        </button>
    )
}