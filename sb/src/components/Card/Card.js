import React from 'react';
import 'moment/locale/ru';
import moment from 'moment';

import Button from '../Button/Button'
import { getRemainDeadline } from '../Utils/getRemainTime';
import Like from '../Actions/Like/Like';
import { Link } from 'react-router-dom';

//bomb icon
import BombIcon from '../../assets/img/bomb.png'

export default function Card({ __id, title, content, publishDate, deadline, isLiked, type, subjectID }) {

    const { progress } = getRemainDeadline(publishDate, deadline)

    return (
        <div className="main-card-wrapper">
            {/* Если карточка должна отображать домашнюю работу, то появляется дедлайн-индикатор */}
            {type === 'homework' && (<div></div>)}

            <div className="newsCard-wrapper">
                <div className="newsCard">
                    <div className="newsCard__title">{title}</div>
                    <div className="newsCard__date">
                        <div className="dates__publish">{moment(publishDate).format('D MMMM, HH:mm')}</div>
                    </div>
                    <div className="newsCard__content">{content.slice(0, 95)}{content.length > 95 ? '...' : ''}</div>
                    <div className="newsCard__footer">
                        <div className="newsCard__footer-controllers">
                            <Like
                                newsCardId={__id}
                                __isLiked={isLiked}
                            />
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
            </div>
        </div>
    )
}