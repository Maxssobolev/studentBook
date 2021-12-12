import React from 'react';

export default function Button({ type, text, __class }) {

    return (
        <button type="button" className={`button ${__class || ''}`}>
            {text}
        </button>
    )
}