import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../components/Card/Card';

//config
import { $authHost } from '../http';

export default function MainPage() {
    const [sortBy, setSortBy] = useState('newest')

    const [news, setNews] = useState([])

    useEffect(() => {
        $authHost.get('/api/news').then(r => setNews(r.data))
    }, [])



    return (
        <>
            <div className="page page-main">
                {news.map((item) => {
                    return (
                        <Card
                            key={`newsCardItem_${item.id}`}
                            __id={item.id}
                            title={item.title}
                            content={item.content}
                            publishDate={item.createdAt}
                            deadline={item.deadline}
                            isLiked={false}
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
