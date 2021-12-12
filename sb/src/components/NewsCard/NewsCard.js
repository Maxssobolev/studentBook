import React from 'react';
import 'moment/locale/ru';
import moment from 'moment';

import Button from '../Button/Button'
import { getRemainTime } from '../Utils/getRemainTime';

export default function NewsCard({ __id, title, description, publishDate, deadline }) {

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
                        <Button text='Подробнее' />
                    </div>
                </div>

            </div>
            <div className="newsCard-controllers">

            </div>

        </div>
    )
}