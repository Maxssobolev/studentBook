import React from 'react';
import 'moment/locale/ru';
import moment from 'moment';
import Interweave from 'interweave';
import Button from '../Button/Button'
import { getRemainDeadline } from '../Utils/getRemainTime';
import Like from '../Actions/Like/Like';
import MarkAsDone from '../Actions/MarkAsDone/MarkAsDone';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { TYPE_HOMEWORK } from '../../config/postTypes'
import { useSelector } from 'react-redux';
import CircleDiagram from '../CircleDiagram/CircleDiagram';
import RemainDedaline from '../Actions/RemainDeadline/RemainDeadline';

const transform = (node, children) => {
    if (node.tagName.toLowerCase() === "table") {
        return <span className='markup-replacement'>таблица</span>
    }
    else if (node.tagName.toLowerCase() === "img") {
        return <span className='markup-replacement'>картинка</span>
    }
};

export default function Card({ id, title, content, publishDate, deadline, isLiked, type, isDone, subjectTitle = '' }) {

    const { isMobile } = useSelector(state => state.window)
    const { remainTime, progress, remainShort } = getRemainDeadline(publishDate, deadline)

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

                    {/* Если карточка должна отображать домашнюю работу, то появляется дедлайн-индикатор */}
                    {/*type === 'homework' && (
                        <div className="deadline-wrapper">
                            <div className="deadline-text">{remainTime}</div>
                            <div className="deadline-chart">
                                <div className="deadline-chart__progress" style={{ width: progress < 5 ? `0px` : `${progress}%` }}></div>
                            </div>
                        </div>
                    )*/}

                    {/* Если карточка должна отображать домашнюю работу, то появляется название предмета */}
                    {type == TYPE_HOMEWORK && <div className="newsCard__subject">{subjectTitle}</div>}
                    <div className="newsCard__title"> {isMobile ? <Link to={`/view/post/${id}?type=${type}`}>{title}</Link> : title}</div>
                    <div className="newsCard__date">
                        <div className="dates__publish">до {moment(deadline).format('D MMMM, HH:mm')}</div>
                    </div>
                    {/* Если карточка должна отображать новость, то появляется ее краткое описание */}
                    {type !== 'homework' && (
                        <div className="newsCard__content"><Interweave content={`${content.slice(0, 95)}${content.length > 95 ? '...' : ''}`} transform={transform} /></div>
                    )}
                    <div className="newsCard__footer">
                        <div className="newsCard__footer-controllers">
                            <Like
                                id={id}
                                isLiked={isLiked}
                                type={type}
                            />
                            {type == 'homework' &&
                                <MarkAsDone
                                    id={id}
                                    isDone={isDone}
                                />
                            }
                            {type === 'homework' && (

                                <RemainDedaline current={remainShort} progress={progress} />

                            )}

                        </div>
                        {!isMobile &&
                            <div className="button-wrapper">
                                <Link to={`/view/post/${id}?type=${type}`}>
                                    <Button type="readmore" />
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    )
}