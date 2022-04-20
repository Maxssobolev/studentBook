import React from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom'
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
import useQuery from '../../components/Hooks/useQuery'


export default function PostViewPage() {
    const match = useRouteMatch();
    const query = useQuery()
    const history = useHistory();
    const id = Number(match.params.id)
    const type = query.get('type') // homework | news

    const [data, setData] = useState(null)

    useEffect(() => {
        const apiUrl = type == 'homework' ? `/api/homeworks/${id}` : `/api/news/${id}`

        $authHost.get(apiUrl).then(({ data: { prevPost, currentPost, nextPost } }) => {
            const { remainTime, progress } = getRemainDeadline(currentPost.createdAt, currentPost.deadline)
            const isLiked = currentPost.usersLiked.length > 0 //в данном запросе возвращается пустой массив, если текущий пользователь не лайкнул
            const isDone = currentPost?.usersDoned?.length > 0 //в данном запросе возвращается пустой массив, если текущий пользователь не отметил как выполненное
            setData({
                prevPost,
                currentPost: {
                    ...currentPost,
                    remainTime,
                    progress,
                    isLiked,
                    isDone
                },
                nextPost
            })
        }).catch(err => {

            setData({ currentPost: null })
        })

    }, [id])

    if (!type || !id || !['homework', 'news'].includes(type))
        return <Redirect to='/404' />
    if (!data)
        return (
            <div className='page page-view page-view_post'>
                <div className="page-controllers">
                    <button type='button' className="prev-page" onClick={() => history.goBack()}><ArrowIcon />{TEXT.page.view.prevPage}</button>
                    <div className="subject-name">{TEXT.loading}</div>
                    <button type='button' className="next-page" disabled>{TEXT.page.view.nextPage} <ArrowIcon /> </button>
                </div>
                <SinglePageLoader />
            </div>
        )
    else if (!data?.currentPost) {
        return (
            <div className="page page-view page-view_post">
                <div className="nothing-to-show">
                    {TEXT.page.nothingToShow.title}
                </div>
            </div>
        )
    }
    else {
        const { currentPost } = data

        return (
            <>
                <div className='page page-view page-view_post'>
                    <div className="page-view__wrapper">
                        <div className="page-controllers">
                            <button type='button' className="prev-page" onClick={() => history.push(`/view/post/${data.prevPost?.id}?type=${type}`)} disabled={data.prevPost ? false : true}><ArrowIcon />{TEXT.page.view.prevPage}</button>
                            <div className="subject-name">{currentPost?.subject?.title || ''}</div>
                            <button type='button' className="next-page" onClick={() => history.push(`/view/post/${data.nextPost?.id}?type=${type}`)} disabled={data.nextPost ? false : true}>{TEXT.page.view.nextPage} <ArrowIcon /> </button>

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
                                <Markup content={currentPost.content} blockList={['figure']} />
                            </div>
                        </div>


                    </div>
                </div>
                <div className="rightsidebar">
                    <div className="actions">

                        <Like id={id} type={type} isLiked={currentPost.isLiked} />
                        {type == 'homework' && <MarkAsDone id={id} isDone={currentPost?.isDone} />}

                    </div>
                </div>
            </>



        )
    }
}