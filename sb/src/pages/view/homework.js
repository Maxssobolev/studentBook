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

export default function HomeworkViewPage() {
    let match = useRouteMatch();
    let history = useHistory();

    const ID = Number(match.params.id)


    const [hw, setHw] = useState(null)

    useEffect(() => {
        //полученный ответ с сервера
        const recievedData = {
            nextID: ID + 1,//SELECT * FROM foo WHERE id > 4 ORDER BY id LIMIT 1;
            title: 'ИДЗ с линейным оператором',
            subjectID: 1,
            content: 'Тестовое дз и его описание не должно быть интересным',
            publishDate: '2022-02-09T17:00:00',
            deadline: '2022-03-20T18:00:00',
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
            <div className='page page-view_hw'>
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
            <div className='page page-view_hw'>
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
            </div>
        )
}