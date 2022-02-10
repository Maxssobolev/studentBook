import React from 'react';
import { useState } from 'react';
import { subjects } from '../config/subjectsList';
import Select from 'react-select';
import { customSelectStyles } from '../components/Utils/customSelectStyles';
import { DropdownIndicator } from '../components/Utils/dropdownIndicator';
import Card from '../components/Card/Card';
import moment from 'moment';
import { TEXT } from '../config/text/text';

export default function HomeWorkPage() {
    const [sortBy, setSortBy] = useState('date')
    const [homeworks, setHomeworks] = useState([
        {
            id: 1,
            title: 'ИДЗ с линейным оператором',
            subjectID: 1,
            content: 'Тестовое дз и его описание не должно быть интересным',
            date: '2021-10-09T17:00:00',
            deadline: '2022-04-20T19:00:00',
        },
        {
            id: 4,
            title: 'ИДЗ с чем то оператором',
            subjectID: 1,
            content: 'Тестовое дз и его описание не должно быть интересным',
            date: '2021-10-10T17:00:00',
            deadline: '2022-05-20T19:00:00',
        },
        {
            id: 2,
            title: 'ИДЗ с графами',
            subjectID: 2,
            content: 'Тестовое дз и его описание не должно быть интересным',
            date: '2021-12-15T17:00:00',
            deadline: '2022-04-20T19:00:00',
        },
        {
            id: 3,
            title: 'ИДЗ с матрицами',
            subjectID: 3,
            content: 'Тестовое дз и его описание не должно быть интересным',
            date: '2021-12-10T17:00:00',
            deadline: '2022-04-11T19:00:00',
        }
    ]);
    const [dataToShow, setDataToShow] = useState(
        //изначально данные отсортированны по дате (сначала новые)
        homeworks.sort(
            (a, b) => {
                return new moment(b[sortBy]).format('YYYYMMDD') - new moment(a[sortBy]).format('YYYYMMDD')
            }
        )
    )


    const handleChangeSubject = (selectedOpt) => {
        if (selectedOpt.value !== 'all')
            setDataToShow(
                [
                    //сначала фильтруем согласно выбранному предмету, создаем копию, чтобы не изменить старый массив
                    ...(homeworks.filter(({ subjectID }) => subjectID === selectedOpt.id))
                ].sort(
                    (a, b) => {
                        if (sortBy === 'deadline') {
                            //Если сортировка по дедлайну, то вначале те, что сгорят быстрее
                            return new moment(a.deadline).format('YYYYMMDD') - new moment(b.deadline).format('YYYYMMDD')
                        }
                        else {
                            return new moment(b[sortBy]).format('YYYYMMDD') - new moment(a[sortBy]).format('YYYYMMDD')
                        }
                    }
                ))
        else
            setDataToShow(homeworks)
    }

    const handleChangeSort = (event) => {
        setSortBy(event.target.value)
        setDataToShow(prev => [...prev].sort(
            (a, b) => {
                if (event.target.value === 'deadline') {
                    //Если сортировка по дедлайну, то вначале те, что сгорят быстрее
                    return new moment(a[event.target.value]).format('YYYYMMDD') - new moment(b[event.target.value]).format('YYYYMMDD')
                }
                else {
                    return new moment(b[event.target.value]).format('YYYYMMDD') - new moment(a[event.target.value]).format('YYYYMMDD')
                }
            }
        ))
    }

    return (
        <>
            <div className="page page-homework">
                {dataToShow.length > 0 ?

                    dataToShow.map((item) => {
                        return (
                            <Card
                                key={`hwCardItem_${item.id}`}
                                type="homework"
                                subjectID={item.subjectID}
                                __id={item.id}
                                title={item.title}
                                content={item.content}
                                publishDate={item.date}
                                deadline={item.deadline}
                                isLiked={item.isLiked}
                            />
                        )
                    })
                    :
                    <div className="nothing-to-show">
                        {TEXT.page.nothingToShow.title}
                    </div>
                }
            </div>
            <div className="rightsidebar">
                <div className="filters">
                    <div className="filters__radio-wrapper" onChange={handleChangeSort} >
                        <div className="radio" >
                            <label>
                                <span>Сначала новые</span>
                                <input type="radio" name='sortBy' value='date' defaultChecked />
                            </label>
                        </div>
                        <div className="radio" >
                            <label>
                                <span>По дедлайну</span>
                                <input type="radio" name='sortBy' value='deadline' />
                            </label>
                        </div>
                    </div>
                    <div className="select-wrapper">
                        <label >

                            <Select styles={customSelectStyles} options={subjects} onChange={handleChangeSubject}
                                components={{ DropdownIndicator }}
                                responsive={{
                                    xsmall: {
                                        display: 'bottom',
                                        touchUi: true
                                    },
                                    small: {
                                        display: 'bottom',
                                        touchUi: true
                                    },

                                }}
                                placeholder='Все предметы'
                            />
                        </label>
                    </div>

                </div>
            </div>
        </>
    )
}
