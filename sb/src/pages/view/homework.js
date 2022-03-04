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
import axios from 'axios'



export default function HomeworkViewPage() {
    const match = useRouteMatch();
    const history = useHistory();
    const ID = match.params.id

    const [hw, setHw] = useState(null)

    useEffect(() => {
        let serverData = {}

        async function getData(url) {
            return await axios.get(url);
        }

        getData(`/api/homework/${ID}`).then(
            r => {
                const recievedData = r.data
                const { remainTime, progress } = getRemainDeadline(recievedData.publishDate, recievedData.deadline)
                serverData = {
                    ...recievedData,
                    remainTime,
                    progress
                }

                setHw(serverData)
                console.log(serverData)

            }
        )

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
                            <div className="subject-name">{hw.subjectTitle}</div>
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