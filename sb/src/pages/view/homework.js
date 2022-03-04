import React from 'react';
import { useRouteMatch } from 'react-router-dom'
import { TEXT } from '../../config/text/text'
import { ReactComponent as ArrowIcon } from '../../assets/img/arrow-right.svg'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { getSubject } from '../../config/subjectsList';
import { getRemainDeadline } from '../../components/Utils/getRemainTime';
import { useEffect } from 'react';
import moment from 'moment';
import SinglePageLoader from '../../components/CustomLoaders/SinglePage';
import { Markup } from 'interweave';
import Like from '../../components/Actions/Like/Like';
import MarkAsDone from '../../components/Actions/MarkAsDone/MarkAsDone';

//api integration


export default function HomeworkViewPage() {
    const match = useRouteMatch();
    const history = useHistory();
    const ID = Number(match.params.id)




    const [hw, setHw] = useState(null)

    useEffect(() => {
        const recievedData = {
            nextID: ID + 1,//SELECT * FROM foo WHERE id > 4 ORDER BY id LIMIT 1;
            title: 'ИДЗ с линейным оператором',
            subjectID: 1,
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem totam, vitae reiciendis libero eveniet id labore excepturi maxime suscipit reprehenderit, provident repudiandae harum deleniti, recusandae voluptatibus itaque quaerat nulla unde quisquam soluta doloremque debitis odit. Officia sapiente quibusdam labore? Molestiae consequuntur possimus placeat totam repellat. Nobis possimus fuga dignissimos praesentium accusantium laudantium doloribus alias maiores, suscipit quos, a incidunt esse. Omnis aperiam cum asperiores sed placeat at incidunt totam quis distinctio assumenda officiis ullam laboriosam necessitatibus quo minima eum, eaque, rerum, repellat laborum quasi veniam impedit excepturi suscipit? Consequatur, rem! Sequi, id expedita repellendus quos atque aperiam facilis fugit deserunt.',
            publishDate: '2022-02-09T17:00:00',
            deadline: '2022-03-20T18:00:00',
            isLiked: false,
            isMarkAsDone: true
        }
        const { remainTime, progress } = getRemainDeadline(recievedData.publishDate, recievedData.deadline)
        const subject = getSubject(recievedData.subjectID)

        setHw({
            ...recievedData,
            remainTime,
            progress,
            subject
        })
    }, [])

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

    else
        return (
            <>
                <div className='page page-view page-view_hw'>
                    <div className="page-view__wrapper">
                        <div className="page-controllers">
                            <button type='button' className="prev-page" onClick={() => history.goBack()}><ArrowIcon />{TEXT.page.view.prevPage}</button>
                            <div className="subject-name">{hw.subject.label}</div>
                            {hw.nextID &&
                                <button type='button' className="next-page" onClick={() => history.push(`/view/homework/${hw.nextID}`)}>{TEXT.page.view.nextPage} <ArrowIcon /> </button>
                            }
                        </div>

                        <div className="deadline-indicator">
                            <div className="dates-row">
                                <div className="dates-row__startDate">{moment(hw.publishDate).format('D.MM')}</div>
                                <div className="dates-row__remain">{hw.remainTime}</div>
                                <div className="dates-row__endDate">{moment(hw.deadline).format('D.MM')}</div>
                            </div>

                            <div className="deadline-chart">
                                <div className="deadline-chart__progress" style={{ width: hw.progress }}></div>
                            </div>
                        </div>

                        <div className="content-wrapper">
                            <div className="page-title">
                                {hw.title}
                            </div>
                            <div className="page-content">
                                <Markup content={hw.content} />
                            </div>
                        </div>


                    </div>
                </div>
                <div className="rightsidebar">
                    <div className="actions">

                        <Like newsCardId={ID} __isLiked={hw.isLiked} />
                        <MarkAsDone newsCardId={ID} __isMarkAsDone={hw.isMarkAsDone} />

                    </div>
                </div>
            </>



        )
}