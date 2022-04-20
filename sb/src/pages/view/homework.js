import React from 'react';
import { useRouteMatch } from 'react-router-dom'
import { TEXT } from '../../config/text/text'
import { ReactComponent as ArrowIcon } from '../../assets/img/arrow-right.svg'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { getRemainDeadline } from '../../components/Utils/getRemainTime';
import { useEffect } from 'react';
import moment from 'moment';
import SinglePageLoader from '../../components/CustomLoaders/SinglePage';
import { Markup } from 'interweave';
import Like from '../../components/Actions/Like/Like';
import MarkAsDone from '../../components/Actions/MarkAsDone/MarkAsDone';
import { $authHost } from '../../http';



export default function HomeworkViewPage() {
    const match = useRouteMatch();
    const history = useHistory();
    const ID = Number(match.params.id)

    const [hw, setHw] = useState(null)

    useEffect(() => {
        $authHost.get(`/api/homeworks/${ID}`).then(({ data: { prevPost, currentPost, nextPost } }) => {
            const { remainTime, progress } = getRemainDeadline(currentPost.createdAt, currentPost.deadline)
            const isLiked = currentPost.usersLiked.length > 0 //в данном запросе возвращается пустой массив, если текущий пользователь не лайкнул

            setHw({
                prevPost,
                currentPost: {
                    ...currentPost,
                    remainTime,
                    progress,
                    isLiked
                },
                nextPost
            })
        }).catch(err => {
            setHw({ currentPost: null })
        })

    }, [ID])

    if (!hw)
        return (
            <div className='page page-view page-view_hw'>
                <div className="page-controllers">
                    <button type='button' className="prev-page" onClick={() => history.goBack()}><ArrowIcon />{TEXT.page.view.prevPage}</button>
                    <div className="subject-name">{TEXT.loading}</div>
                    <button type='button' className="next-page" disabled>{TEXT.page.view.nextPage} <ArrowIcon /> </button>
                </div>
                <SinglePageLoader />
            </div>
        )
    else if (!hw?.currentPost) {
        return (
            <div className="page page-view page-view_hw">
                <div className="nothing-to-show">
                    {TEXT.page.nothingToShow.title}
                </div>
            </div>
        )
    }
    else {
        const { currentPost } = hw

        return (
            <>
                <div className='page page-view page-view_hw'>
                    <div className="page-view__wrapper">
                        <div className="page-controllers">
                            <button type='button' className="prev-page" onClick={() => history.push(`/view/homework/${hw.prevPost?.id}`)} disabled={hw.prevPost ? false : true}><ArrowIcon />{TEXT.page.view.prevPage}</button>
                            <div className="subject-name">{hw.subjectTitle}</div>
                            <button type='button' className="next-page" onClick={() => history.push(`/view/homework/${hw.nextPost?.id}`)} disabled={hw.nextPost ? false : true}>{TEXT.page.view.nextPage} <ArrowIcon /> </button>

                        </div>

                        <div className="deadline-indicator">
                            <div className="dates-row">
                                <div className="dates-row__startDate">{moment(currentPost.createdAt).format('D.MM')}</div>
                                <div className="dates-row__remain">{currentPost.remainTime}</div>
                                <div className="dates-row__endDate">{moment(currentPost.deadline).format('D.MM')}</div>
                            </div>

                            <div className="deadline-chart">
                                <div className="deadline-chart__progress" style={{ width: currentPost.progress < 5 ? `0px` : `${currentPost.progress}%` }}></div>
                            </div>
                        </div>

                        <div className="content-wrapper">
                            <div className="page-title">
                                {currentPost.title}
                            </div>
                            <div className="page-content">
                                <Markup content={currentPost.content} />
                            </div>
                        </div>


                    </div>
                </div>
                <div className="rightsidebar">
                    <div className="actions">

                        <Like id={ID} type='homework' isLiked={currentPost.isLiked} />
                        <MarkAsDone newsCardId={ID} __isMarkAsDone={currentPost.isMarkAsDone} />

                    </div>
                </div>
            </>



        )
    }
}