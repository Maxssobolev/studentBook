import React from 'react';
import 'moment/locale/ru';
import moment from 'moment';

import Button from '../Button/Button'
import { getRemainTime } from '../Utils/getRemainTime';
import Like from '../Actions/Like/Like';
import { Link } from 'react-router-dom';

export default function NewsCard({ __id, title, description, publishDate, deadline, isLiked }) {

    const remainTime = getRemainTime(deadline)

    return (
        <div className="newsCard-wrapper">
            <div className="newsCard">
                <div className="newsCard__title">{title}</div>
                <div className="newsCard__description">{description}...</div>
                <div className="newsCard__footer">
                    <div className="dates">
                        <div className="dates__publish">{moment(publishDate).format('D MMMM, HH:mm')}</div>
                        <div className="dates__deadline">{remainTime}</div>
                    </div>
                    <div className="button-wrapper">
                        <Link to={{
                            pathname: `/view/news/${__id}`,
                        }}>
                            <Button type="readmore" />
                        </Link>
                    </div>
                </div>

            </div>
            <div className="newsCard-controllers">
                <Like
                    newsCardId={__id}
                    __isLiked={isLiked}
                />
            </div>

        </div>
    )
}