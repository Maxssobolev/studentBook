import React, { useState } from 'react';
import { useEffect } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { ReactComponent as LikeIcon } from '../../../assets/img/actions/like.svg'
import { ReactComponent as LikedIcon } from '../../../assets/img/actions/liked.svg'
import { $authHost } from '../../../http';

export default function Like({ id, isLiked, type }) {
    const [like, setLike] = useState(isLiked || false)
    const handleLike = async () => {
        let resp = await $authHost.post('/api/posts/like', { postId: id, postType: type })
        if (resp.status == 200)
            setLike(!like)
    }
    useEffect(() => {
        setLike(isLiked)
    }, [isLiked])

    return (
        <div className="action action_like">

            <button type='button' onClick={handleLike} >
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