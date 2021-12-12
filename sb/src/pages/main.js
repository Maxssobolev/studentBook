import React from 'react';
import NewsCard from '../components/NewsCard/NewsCard';

const news = [
    {
        id: '1',
        title: 'Начало зачетной недели',
        description: 'Сессия – это наиболее сложный период обучения для любого студента высшего учебного заведения. В это время проверяются знания и умения учащихся, накопленные на протяжении всего семестра. От того, будут ли экзамены сданы успешно, зависит многое: возможность продолжения учебы, перевода с платного отделения на бюджет, с заочной или вечерней формы на дневную, перспективы получения стипендии или перехода в другой вуз.',
        date: '2021-12-10T17:00:00',
        deadline: '2021-12-10T19:00:00'
    }
]

export default function MainPage() {

    return (
        <div className="page page-main">
            {news.map((item) => {
                return (
                    <NewsCard
                        key={`newsCardItem_${item.id}`}
                        __id={item.id}
                        title={item.title}
                        description={item.description.slice(0, 60)}
                        publishDate={item.date}
                        deadline={item.deadline}
                    />
                )
            })}
        </div>
    )
}
