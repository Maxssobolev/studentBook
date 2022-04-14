import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../components/Card/Card';
import { TEXT } from '../config/text/text'
//config
import { $authHost } from '../http';

export default function MainPage() {
    const [sortBy, setSortBy] = useState('newest')

    const [news, setNews] = useState([])

    useEffect(() => {
        $authHost.get('/api/news').then(r => setNews(r.data))
    }, [])


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
                {news.map((item) => {
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
                            type={'news'}
                        />
                    )
                })}

            </div>
            <div className="rightsidebar">
                <div className="filters">
                    <div className="filters__radio-wrapper" onChange={event => setSortBy(event.target.value)}>
                        <div className="radio">
                            <label >
                                <span>Сначала новые</span>
                                <input type="radio" name='sortBy' value='newest' defaultChecked />
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
        </>
    )
}
