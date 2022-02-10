import React from 'react';
import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button'
import Select from 'react-select'
import { DropdownIndicator } from '../components/Utils/dropdownIndicator';
//config
import { API } from '../config/api/api';

export default function MainPage() {
    const [sortBy, setSortBy] = useState('newest')


    const [news, setNews] = useState([{
        id: '1',
        title: 'Начало зачетной недели',
        content: 'Нужно прийти в костюмах, костюмы должны быть в костюмах',
        date: '2021-12-10T17:00:00',
        deadline: '2021-12-10T19:00:00',
        isLiked: false
    },
    ])



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
                            publishDate={item.date}
                            deadline={item.deadline}
                            isLiked={item.isLiked}
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
