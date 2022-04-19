import React from 'react';
import 'moment/locale/ru';
import moment from 'moment';

import Button from '../Button/Button'
import { getRemainDeadline } from '../Utils/getRemainTime';
import Like from '../Actions/Like/Like';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
export default function Card({ id, title, content, publishDate, deadline, isLiked, type, subjectTitle = '' }) {

    const { remainTime, progress } = getRemainDeadline(publishDate, deadline)

    return (
        <motion.div
            animate={{ opacity: 1 }}
            intial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            layout
            className='main-card-wrapper'
        >



            <div className="newsCard-wrapper">
                <div className={`newsCard ${type === 'homework' ? 'newsCard_hw' : ''}`}>
                    {/* Если карточка должна отображать домашнюю работу, то появляется название предмета */}
                    {type === 'homework' && <div className="newsCard__subject">{subjectTitle}</div>}
                    {/* Если карточка должна отображать домашнюю работу, то появляется дедлайн-индикатор */}
                    {type === 'homework' && (
                        <div className="deadline-chart">
                            <div className="deadline-chart__progress" style={{ width: progress }}></div>
                            <div className="deadline-chart__text">{remainTime}</div>
                        </div>
                    )}
                    <div className="newsCard__title">{title}</div>
                    <div className="newsCard__date">
                        <div className="dates__publish">{moment(publishDate).format('D MMMM, HH:mm')}</div>
                    </div>
                    {/* Если карточка должна отображать новость, то появляется ее краткое описание */}
                    {type !== 'homework' && (
                        <div className="newsCard__content">{content.slice(0, 95)}{content.length > 95 ? '...' : ''}</div>
                    )}
                    <div className="newsCard__footer">
                        <div className="newsCard__footer-controllers">
                            <Like
                                id={id}
                                isLiked={isLiked}
                                type={type}
                            />
                        </div>
                        <div className="button-wrapper">
                            <Link to={{
                                pathname: type === 'homework' ? `/view/homework/${id}` : `/view/news/${id}`,
                            }}>
                                <Button type="readmore" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}