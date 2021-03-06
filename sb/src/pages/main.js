import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../components/Card/Card';
import { TEXT } from '../config/text/text'
import { motion, AnimatePresence } from 'framer-motion'
import { $authHost } from '../http';
import moment from 'moment';
import { TYPE_NEWS } from '../config/postTypes'
import { useDispatch, useSelector } from 'react-redux';
import { seenAllIncomingPosts } from '../state/reducers/postsReducer';

export default function MainPage() {
    const dispatch = useDispatch()
    const { isMobile } = useSelector(state => state.window)
    const { news } = useSelector(state => state.posts)

    const [sortBy, setSortBy] = useState('createdAt')

    const [dataToShow, setDataToShow] = useState([])
    useEffect(() => {

        setDataToShow(
            //изначально данные отсортированны по дате (сначала новые)
            [...news].sort(
                (a, b) => {
                    return new moment(b[sortBy]).format('YYYYMMDD') - new moment(a[sortBy]).format('YYYYMMDD')
                }
            )
        )

    }, [news])

    useEffect(() => {
        dispatch(seenAllIncomingPosts({ postType: TYPE_NEWS }))
    }, [dispatch])

    const handleChangeSort = (event) => {
        setSortBy(event.target.value)
        setDataToShow([...news].sort(
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

    if (news.length == 0) {
        return (
            <div className="page page-main">
                <div className="nothing-to-show">
                    {TEXT.page.nothingToShow.title}
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="page page-main">


                {dataToShow.length > 0 ?
                    (<motion.div layout className='page-main-cardsWrapper'>
                        <AnimatePresence>
                            {
                                dataToShow.map((item) => {
                                    const isLiked = item.usersLiked.length > 0 //в данном запросе возвращается пустой массив, если текущий пользователь не лайкнул

                                    return (
                                        <Card
                                            key={`newsCardItem_${item.id}`}
                                            id={item.id}
                                            title={item.title}
                                            content={item.content}
                                            publishDate={item.createdAt}
                                            deadline={item.deadline}
                                            isLiked={isLiked}
                                            type={TYPE_NEWS}
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
                            <div className="radio">
                                <label >
                                    <span>Сначала новые</span>
                                    <input type="radio" name='sortBy' value='createdAt' defaultChecked />
                                </label>
                            </div>
                            <div className="radio">
                                <label >
                                    <span>По дедлайну</span>
                                    <input type="radio" name='sortBy' value='deadline' />
                                </label>
                            </div>
                        </div>


                    </div>
                </div>
            }
        </>
    )
}
