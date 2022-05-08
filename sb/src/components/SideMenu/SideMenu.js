import React from 'react';
import { NavLink } from 'react-router-dom';
import Login from './Login'

import '../../assets/scss/sideMenu.scss'
//Обьект с навигацией
import { nav } from '../../config/navObject'

export default function SideMenu() {

    return (
        <div className="sideMenu">
            <div className="sideMenu__item-wrapper" >
                <Login />
            </div>
            {nav.map((item, idx) => {
                let Icon = item.icon
                return (
                    <div className="sideMenu__item-wrapper" key={`sideMenuItem_${idx}`}>
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