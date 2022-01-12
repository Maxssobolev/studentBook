import React from 'react';
import { useState } from 'react';
import { getHomeworkIcon } from '../components/Utils/getHomeworkIcon';
import { getRemainDeadline } from '../components/Utils/getRemainTime';

export default function HomeWorkPage() {
    const [homeworks, setHomeworks] = useState([
        {
            id: 1,
            title: 'ИДЗ с линейным оператором',
            subjectID: 1,
            date: '2021-12-10T17:00:00',
            deadline: '2022-01-20T19:00:00',
        }
    ]);

    console.log(getRemainDeadline('2021-12-10T17:00:00', '2022-01-20T19:00:00'))


    return (
        <div className="page page-homework">

        </div>
    )
}
