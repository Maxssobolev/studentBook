import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setFullTimeTable } from "../../state/reducers/modalsReducer";
import { calendar } from "../../config/api";
import moment from "moment";

export default function FullTimeTable() {
    const { isOpen } = useSelector(state => state.modals.fullTimeTable)
    const dispatch = useDispatch()

    const today = moment().format('ddd DD.MM')
    const todayWeekParity = moment().week() % 2

    const weekDict = {
        Mon: 'Понедельник',
        Tue: 'Вторник',
        Wed: 'Среда',
        Thu: 'Четверг',
        Fri: 'Пятница',
        Sat: 'Суббота',
    };

    return (
        <Modal show={isOpen} onHide={() => dispatch(setFullTimeTable(false))} className="modal modal_fullTimeTable">
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className="info">
                        <div className="day">{today}</div>
                        <div className="week">
                            {todayWeekParity ? 'Нечетная' : 'Четная'} неделя
                        </div>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="daytimetable">
                    <tbody>

                        {calendar.map(({ id, weekday, name, start, weekparity, link }, index) => {
                            let startTime = moment(start, 'HH:mm'); //время начала пары
                            let endTime = moment(startTime).add({ hours: 1, minutes: 25 }).format('HH:mm'); //время окончания пары
                            let nextIndex = (index + 1) % calendar.length;
                            let isWrap = true;
                            let notThisWeekendClass = weekparity == 'both' ? '' : weekparity == todayWeekParity ? '' : 'anotherWeekparity'
                            if (weekday == calendar[nextIndex].weekday && index != 0)
                                isWrap = false;
                            else
                                isWrap = true;

                            if (weekday != 'Sun') {
                                return (
                                    <React.Fragment key={`timetablefull-${index}`}>
                                        {isWrap && index == 0 && (
                                            <>
                                                <tr className='weekday'>
                                                    <td colSpan={2}> {weekDict[weekday]} </td>

                                                </tr>
                                                <tr className={notThisWeekendClass}>
                                                    <td
                                                        style={{
                                                            paddingRight: '20px',
                                                        }}>
                                                        {start}-{endTime}
                                                    </td>
                                                    <td>{name}</td>
                                                </tr>
                                            </>
                                        )
                                        }
                                        {
                                            isWrap && index != 0 && (
                                                <>
                                                    <tr className={notThisWeekendClass}>
                                                        <td
                                                            style={{
                                                                paddingRight: '20px',
                                                            }}>
                                                            {start}-{endTime}
                                                        </td>
                                                        <td>{name}</td>
                                                    </tr>
                                                    {index != calendar.length - 1 &&
                                                        <tr className='weekday'>
                                                            <td colSpan={2}> {weekDict[calendar[nextIndex].weekday]} </td>

                                                        </tr>
                                                    }
                                                </>
                                            )
                                        }

                                        {
                                            !isWrap && index != 0 && (
                                                <>
                                                    <tr className={notThisWeekendClass}>
                                                        <td
                                                            style={{
                                                                paddingRight: '20px',
                                                            }}>
                                                            {start}-{endTime}
                                                        </td>
                                                        <td>{name}</td>
                                                    </tr>

                                                </>
                                            )
                                        }

                                    </React.Fragment>
                                );
                            }
                        })}
                    </tbody>
                </table>
            </Modal.Body>
        </Modal >
    )
}