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
import useSubjects from '../components/Hooks/useSubjects'
import { TYPE_HOMEWORK } from '../config/postTypes'
import { useDispatch, useSelector } from 'react-redux';
import { seenAllIncomingPosts } from '../state/reducers/postsReducer';

export default function HomeWorkPage() {
    const dispatch = useDispatch()
    const { isMobile } = useSelector(state => state.window)
    const { homeworks } = useSelector(state => state.posts)

    const subjects = useSubjects({ subjectsOnly: false })
    const [sortBy, setSortBy] = useState('createdAt')

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
        setDataToShow([...homeworks].sort(
            (a, b) => {
                return new moment(b[sortBy]).format('YYYYMMDD') - new moment(a[sortBy]).format('YYYYMMDD')
            }
        ))

    }, [homeworks])

    useEffect(() => {
        dispatch(seenAllIncomingPosts({ postType: TYPE_HOMEWORK }))
    }, [dispatch])


    return (
        <>

            <div className="page page-homework">

                {dataToShow.length > 0 ?
                    (<motion.div layout className='page-homework-cardsWrapper'>
                        <AnimatePresence>
                            {
                                dataToShow.map((item) => {
                                    const isLiked = item?.usersLiked?.length > 0  //в данном запросе возвращается пустой массив, если текущий пользователь не лайкнул
                                    const isDone = item?.usersDoned?.length > 0  //в данном запросе возвращается пустой массив, если текущий пользователь не лайкнул
                                    const subjTitle = item.subject.title == 'default' ? 'Без предмета' : item.subject.title
                                    return (
                                        <Card
                                            key={`hwCardItem_${item.id}`}
                                            type={TYPE_HOMEWORK}
                                            id={item.id}
                                            title={item.title}
                                            publishDate={item.createdAt}
                                            deadline={item.deadline}
                                            isLiked={isLiked}
                                            isDone={isDone}
                                            subjectTitle={subjTitle}
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
            {!isMobile &&
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
            }
        </>
    )
}
