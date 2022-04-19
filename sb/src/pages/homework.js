import React from 'react';
import { useState } from 'react';
import Select from 'react-select';
import { customSelectStyles } from '../components/Utils/customSelectStyles';
import { DropdownIndicator } from '../components/Utils/dropdownIndicator';
import Card from '../components/Card/Card';
import moment from 'moment';
import { TEXT } from '../config/text/text';
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react';
import { $authHost } from '../http';
import useSubjects from '../components/Hooks/useSubjects'

export default function HomeWorkPage() {
    const subjects = useSubjects({ subjectsOnly: false })
    const [sortBy, setSortBy] = useState('createdAt')
    const [homeworks, setHomeworks] = useState([]);
    const [dataToShow, setDataToShow] = useState([])

    const handleChangeSubject = (selectedOpt) => {
        if (selectedOpt.value !== 'all')
            setDataToShow(
                [
                    //сначала фильтруем согласно выбранному предмету, создаем копию, чтобы не изменить старый массив
                    ...(homeworks.filter(({ subjectId }) => subjectId === selectedOpt.id))
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

    useEffect(() => {
        $authHost.get(`/api/homeworks`).then(
            r => {
                const recievedData = r.data
                setHomeworks(recievedData)
                setDataToShow(
                    //изначально данные отсортированны по дате (сначала новые)
                    recievedData.sort(
                        (a, b) => {
                            return new moment(b[sortBy]).format('YYYYMMDD') - new moment(a[sortBy]).format('YYYYMMDD')
                        }
                    )
                )
            }
        )

    }, [])

    return (
        <>

            <div className="page page-homework">

                {dataToShow.length > 0 ?
                    (<motion.div layout className='page-homework-cardsWrapper'>
                        <AnimatePresence>
                            {
                                dataToShow.map((item) => {
                                    const isLiked = item.usersLiked.length > 0 //в данном запросе возвращается пустой массив, если текущий пользователь не лайкнул

                                    return (
                                        <Card
                                            key={`hwCardItem_${item.id}`}
                                            type="homework"
                                            id={item.id}
                                            title={item.title}
                                            publishDate={item.createdAt}
                                            deadline={item.deadline}
                                            isLiked={isLiked}
                                            subjectTitle={item.subject.title}
                                        />
                                    )
                                })
                            }
                        </AnimatePresence>
                    </motion.div>)
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
                                <input type="radio" name='sortBy' value='createdAt' defaultChecked />
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
