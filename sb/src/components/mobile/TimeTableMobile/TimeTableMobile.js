import React, { useState, useEffect } from 'react';

import moment from 'moment';
import 'moment/locale/ru';

import { Code } from 'react-content-loader'
import SubjectCardMobile from './SubjectCardMobile';
import { useRef } from 'react';

export default function TimeTable() {
    const [calendar, setCalendar] = useState([
        { "id": "1", "weekday": "Mon", "weekparity": "1", "start": "11:40", "name": "Программирование", "link": "0x" },
        { "id": "2", "weekday": "Mon", "weekparity": "0", "start": "11:40", "name": "Правоведение", "link": "0x" },
        { "id": "3", "weekday": "Mon", "weekparity": "both", "start": "13:45", "name": "Программирование (пр)", "link": "0x" },
        { "id": "4", "weekday": "Mon", "weekparity": "1", "start": "15:20", "name": "Правоведение (пр)", "link": "0x" },
        { "id": "5", "weekday": "Tue", "weekparity": "both", "start": "11:40", "name": "Экономика", "link": "0x" },
        { "id": "6", "weekday": "Tue", "weekparity": "both", "start": "16:45", "name": "Прикладной дизайн", "link": "0x" },
        { "id": "7", "weekday": "Tue", "weekparity": "both", "start": "15:20", "name": "Экономика (пр)", "link": "0x" },
        { "id": "8", "weekday": "Wed", "weekparity": "both", "start": "8:30", "name": "Ин. яз.", "link": "0x" },
        { "id": "9", "weekday": "Wed", "weekparity": "both", "start": "10:05", "name": "Физ-ра", "link": "0x" },
        { "id": "10", "weekday": "Thu", "weekparity": "both", "start": "10:05", "name": "ИО и МО (пр)", "link": "0x" },
        { "id": "11", "weekday": "Thu", "weekparity": "both", "start": "11:40", "name": "ИО и МО", "link": "0x" },
        { "id": "12", "weekday": "Thu", "weekparity": "both", "start": "13:45", "name": "ИО и Т (пр)", "link": "0x" },
        { "id": "13", "weekday": "Thu", "weekparity": "both", "start": "15:20", "name": "ИО и Т", "link": "0x" },
        { "id": "14", "weekday": "Fri", "weekparity": "both", "start": "10:05", "name": "Прикладной дизайн (пр)", "link": "0x" },
        { "id": "15", "weekday": "Fri", "weekparity": "both", "start": "11:40", "name": "ММТ (пр)", "link": "0x" },
        { "id": "16", "weekday": "Fri", "weekparity": "both", "start": "13:45", "name": "ММТ", "link": "0x" },
        { "id": "17", "weekday": "Sat", "weekparity": "both", "start": "10:05", "name": "Учебная практика", "link": "0x" }
    ])
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