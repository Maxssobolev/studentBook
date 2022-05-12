import React, { useState, useEffect } from 'react';

import moment from 'moment';
import 'moment/locale/ru';

import { Code } from 'react-content-loader'
import SubjectCardMobile from './SubjectCardMobile';
import { useRef } from 'react';
import { calendar } from '../../../config/api';
export default function TimeTable() {

    const [time, setTime] = useState(Date.now());
    const [todayTimeTable, setTodayTimeTable] = useState()

    const today = moment().format('dddd DD.MM')
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
                            now: true,
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


        return [
            prevSub ?? '',

            currentSub
                ? currentSub
                : {
                    breakTime: result,
                    noSubjectsForToday: true
                }
            ,

            nextSub ? (firstPara ? firstPara : nextSub[0]) : ''
        ]

    }


    //Заводим таймер обновления состояния каждые десять секунд
    useEffect(() => {


        const interval = setInterval(() => setTime(Date.now()), 10 * 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const timtableRef = useRef()
    //вызываем функцию и подписываемся на обновления таймера 
    useEffect(() => {
        let timetable = getTimeTable()
        setTodayTimeTable(timetable)

        //костыль какой-то, мне не нравится
        if (timtableRef.current && timetable.length > 2) {
            timtableRef.current.scrollTo({
                left: 150,
                top: 0,
                behavior: "smooth"
            })
        }

    }, [time, calendar])
    //если раписание еще не загрузилось
    if (!todayTimeTable) {
        return (
            <div className="timetable-mobile">
                <div className='timetable-mobile__info-row'>
                    <div className="day">{today}</div>
                    <div className="week">
                        {weekParity ? 'Нечетная' : 'Четная'} неделя
                    </div>
                </div>
                <div className='timetable-mobile__main-row'>
                    {/* Анимационная заглушка загружающегося расписания */}
                    <Code
                        height={50}
                    />

                </div>

            </div >
        )
    }



    return (
        <div className="timetable-mobile">
            <div className='timetable-mobile__info-row'>
                <div className="day">{today}</div>
                <div className="week">
                    {weekParity ? 'Нечетная' : 'Четная'} неделя
                </div>
            </div>
            <div className='timetable-mobile__main-row' ref={timtableRef} >
                {todayTimeTable.map((itm, idx) => {
                    if (itm) {
                        let now = itm.now ?? false
                        if (itm?.noSubjectsForToday) {
                            return <SubjectCardMobile
                                isPlaceholder={true}
                                key={`timetable__${idx}`}
                            />
                        }
                        return (
                            <SubjectCardMobile
                                start={itm.start}
                                end={itm.end}
                                name={itm.name}
                                link={itm.link}
                                now={now}

                                key={`timetable__${idx}`}
                            />
                        )
                    }
                })}
            </div>


        </div>
    )
}