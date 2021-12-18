import React from 'react';
import { ReactComponent as RightArrow } from '../../assets/img/arrow-right.svg';



export default function Button({ type, text, __class }) {

    return (
        <button type="button" className={`button ${__class || ''}`}>
            {text}
            {type === 'readmore' && <RightArrow />}
        </button>
    )
}