import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { ReactComponent as LikeIcon } from '../../../assets/img/actions/like.svg'
import { ReactComponent as LikedIcon } from '../../../assets/img/actions/liked.svg'

export default function Like({ newsCardId, __isLiked: isLiked, type }) {
    const [like, setLike] = useState(isLiked || false)
    const handleLike = () => {
        setLike(!like)
    }
    return (
        <div className="action action_like">

            <button type='button' onClick={handleLike}>
                <SwitchTransition mode='out-in'>
                    <CSSTransition
                        key={like}
                        timeout={200}
                        classNames="fade"
                    >
                        {like ? <LikedIcon /> : <LikeIcon />}
                    </CSSTransition>
                </SwitchTransition>
            </button>

        </div>
    )
}