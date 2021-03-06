import React, { useState } from 'react';

import moment from 'moment';
import 'moment/locale/ru';

import { ReactComponent as ArrowDown } from '../../assets/img/timetable-arrow-down.svg'
import { useEffect } from 'react';
import { calendar } from '../../config/api';
import { Code } from 'react-content-loader'
import { setFullTimeTable } from '../../state/reducers/modalsReducer';
import { useDispatch } from 'react-redux';

export default function TimeTable() {
    const dispatch = useDispatch()

    const [time, setTime] = useState(Date.now());
    const [todayTimeTable, setTodayTimeTable] = useState()

    const today = moment().format('ddd DD.MM')
    const weekParity = moment().week() % 2

    //обрабатываем обьекты предметов в расписании
    const getTimeTable = () => {
        let weekday = moment().lang("en").format('ddd');
        let nowTime = moment();
        //заготовки
        let prevSub = '';
        let currentSub = '';
        let nextSub = [];
        let paraStart = [];
        let isIbeforeAll = true;
        let firstPara = '';
        //---------


        for (let i in calendar) {
            if (weekday == calendar[i].weekday) {

                //если совпадает четность недели
                if (calendar[i].weekparity == weekParity || calendar[i].weekparity == 'both') {
                    let startTime = moment(calendar[i].start, 'HH:mm'); //время начала пары
                    let endTime = moment(startTime).add({ hours: 1, minutes: 25 }); //время окончания пары

                    //Если пара прошла
                    if (endTime.isBefore(nowTime)) {
                        prevSub = {
                            start: startTime.format('HH:mm'),
                            end: endTime.format('HH:mm'),
                            name: calendar[i].name,
                            link: calendar[i].link,
                        };

                        isIbeforeAll = false;
                    }
                    //Если пара идет
                    else if (startTime.isBefore(nowTime) && nowTime.isBefore(endTime)) {
                        currentSub = {
                            start: startTime.format('HH:mm'),
                            end: endTime.format('HH:mm'),
                            name: calendar[i].name,
                            link: calendar[i].link,
                        };
                        isIbeforeAll = false;
                    }

                    //Если пара будет
                    else if (nowTime.isBefore(startTime)) {
                        nextSub.push({
                            start: startTime.format('HH:mm'),
                            end: endTime.format('HH:mm'),
                            name: calendar[i].name,
                            link: calendar[i].link,
                        });
                        paraStart.push(startTime);

                        if (isIbeforeAll && !firstPara) {

                            // Если ни одной пары еще не было, берем во фьючер первую
                            let startTimef = moment(nextSub[0].start, 'HH:mm'); //время начала пары
                            let endTimef = moment(startTimef).add({ hours: 1, minutes: 25 }); //время окончания пары
                            firstPara = {
                                startObj: startTimef,
                                start: startTimef.format('HH:mm'),
                                end: endTimef.format('HH:mm'),
                                name: nextSub[0].name,
                                link: nextSub[0].link,
                            };
                        }
                    }
                }
            }
        }


        //расчет времени, оставшегося до следующей пары
        if (paraStart.length > 0) {
            var different = paraStart[0].diff(nowTime);
            if (firstPara) {
                var different = nowTime.diff(firstPara.startObj);
            }
        } else {
            var different = '';
        }

        let hours = different
            ? firstPara
                ? parseInt(Math.abs(Math.floor((different % 86400000) / 3600000))) - 1
                : Math.floor((different % 86400000) / 3600000)
            : ''; //Почему-то показывает на час больше - костыляем
        let minutes = different
            ? Math.abs(Math.round(((different % 86400000) % 3600000) / 60000))
            : '';
        let result = minutes ? (hours ? hours + ' ч ' : '') + minutes + ' мин' : '∞';
        //-------------------------------------


        return {
            prevSub: prevSub ?? '',
            currentSub: currentSub
                ? currentSub
                : {
                    breakTime: result,
                },
            nextSub: nextSub ? (firstPara ? firstPara : nextSub[0]) : '',
        }

    }


    //Заводим таймер обновления состояния каждые десять секунд
    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 10 * 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    //вызываем функцию и подписываемся на обновления таймера 
    useEffect(() => {
        let timetable = getTimeTable()
        setTodayTimeTable(timetable)
    }, [time, calendar])


    //если сегодня выходной (бд вернула пустой массив - предметов нет) !!!!!!!!СТИЛИЗОВАТЬ!!!!!!!
    const isSunday = moment().format('dddd') == 'Sunday'
    if (isSunday) {
        return (
            <div className="timetable">
                <div className="leftside">
                    <div className="day">{today}</div>
                    <div className="week">
                        {weekParity ? 'Нечетная' : 'Четная'}
                    </div>
                </div>
                <div className="rightside loading">
                    <div className="weekend">Сегодня выходной</div>
                    <div className="arrow-down">
                        <ArrowDown />
                    </div>
                </div>
            </div>
        )
    }

    //если раписание еще не загрузилось
    if (!todayTimeTable) {
        return (
            <div className="timetable">
                <div className="leftside">
                    <div className="day">{today}</div>
                    <div className="week">
                        {weekParity ? 'Нечетная' : 'Четная'}
                    </div>
                </div>
                <div className="rightside loading">
                    {/* Анимационная заглушка загружающегося расписания */}
                    <Code
                        height={50}
                    />

                </div>

            </div >
        )
    }

    return (
        <div className="timetable">
            <div className="leftside">
                <div className="day">{today}</div>
                <div className="week">
                    {weekParity ? 'Нечетная' : 'Четная'}
                </div>
            </div>
            <div className="rightside">
                <div className="subjects">

                    <div className="subject subject_prev">
                        <div className="subject__time">
                            {
                                todayTimeTable.prevSub ?
                                    todayTimeTable.prevSub.start
                                    :
                                    ''
                            }
                        </div>
                        <div className="subject__separator">—</div>
                        <div className="subject__title">
                            {
                                todayTimeTable.prevSub ?
                                    todayTimeTable.prevSub.name
                                    :
                                    ''
                            }
                        </div>
                    </div>

                    <div className="subject subject_now">
                        <div className="subject__time">
                            {
                                todayTimeTable.currentSub.start ?
                                    todayTimeTable.currentSub.start
                                    :
                                    todayTimeTable.currentSub.breakTime ?? ''
                            }
                        </div>
                        <div className="subject__separator">—</div>
                        <div className="subject__title">
                            {
                                todayTimeTable.currentSub.start ?
                                    //если сейчас идет пара, то все как обычно выводим
                                    todayTimeTable.currentSub.name
                                    :
                                    //иначе выводим слово "перерыв"
                                    'перерыв'
                            }
                        </div>
                    </div>
                    <div className={`subject subject_next ${todayTimeTable.nextSub ? '' : 'subject_next_empty'}`}>
                        {todayTimeTable.nextSub ?
                            (<>
                                <div className="subject__time">
                                    {todayTimeTable.nextSub.start}
                                </div>
                                <div className="subject__separator">—</div>
                                <div className="subject__title">
                                    {todayTimeTable.nextSub.name}
                                </div>
                            </>)
                            :
                            <div className="emptySub"></div>
                        }
                    </div>
                </div>
                <div className="arrow-down" onClick={() => dispatch(setFullTimeTable(true))}>
                    <ArrowDown />
                </div>
            </div>
        </div>
    )
}