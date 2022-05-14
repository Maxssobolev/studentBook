import React from 'react';
import { NavLink } from 'react-router-dom';
import Login from './Login'

import '../../assets/scss/sideMenu.scss'
//Обьект с навигацией
import { nav } from '../../config/navObject'
import { useSelector } from 'react-redux';

export default function SideMenu() {
    const posts = useSelector(state => state.posts)
    const countNewsNotifications = posts.news.filter(({ isSeen }) => isSeen == false).length
    const countHomeworksNotifications = posts.homeworks.filter(({ isSeen }) => isSeen == false).length

    return (
        <div className="sideMenu">
            <div className="sideMenu__item-wrapper" >
                <Login />
            </div>
            {nav.map((item, idx) => {
                let Icon = item.icon
                return (
                    <div className="sideMenu__item-wrapper" key={`sideMenuItem_${idx}`}>
                        {item.link == '/main' && countNewsNotifications > 0 && <span className="notification">{countNewsNotifications}</span>}
                        {item.link == '/homework' && countHomeworksNotifications > 0 && <span className="notification">{countHomeworksNotifications}</span>}
                        <NavLink
                            to={item.link}
                            className="sideMenu__item"
                            activeClassName="active"
                            data-title={item.title}
                        >
                            <Icon />
                        </NavLink>
                    </div>
                )
            })}
        </div >
    )
}