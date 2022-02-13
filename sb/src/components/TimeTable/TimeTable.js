import moment from 'moment';
import 'moment/locale/ru';

import React from 'react';

export default function TimeTable() {

    const today = moment().format('ddd DD.MM')
    const weekParity = moment().week() % 2

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
                        <div className="subject__time">11:40</div>
                        <div className="subject__separator">—</div>
                        <div className="subject__title">Алгоритмизация и программирование</div>
                    </div>
                    <div className="subject subject_now">
                        <div className="subject__time">14:20</div>
                        <div className="subject__separator">—</div>
                        <div className="subject__title">Алгоритмизация и программирование</div>
                    </div>
                    <div className="subject subject_next">
                        <div className="subject__time">16:20</div>
                        <div className="subject__separator">—</div>
                        <div className="subject__title">Алгоритмизация и программирование</div>
                    </div>
                </div>
            </div>
        </div>
    )
}