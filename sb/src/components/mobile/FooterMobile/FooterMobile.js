import React from 'react';
import { nav } from '../../../config/navObject'
import { NavLink } from 'react-router-dom';
import Login from '../../SideMenu/Login';

export default function FooterMobile() {

    return (
        <div className="footer-mobile">

            {nav.map((item, idx) => {
                if (!item.disabled) {
                    let Icon = item.icon
                    return (
                        <div className="footer-mobile__item-wrapper" key={`footer-mobileItem_${idx}`}>
                            <NavLink
                                to={item.link}
                                className="sideMenu__item"
                                activeClassName="active"
                            >
                                <Icon />
                            </NavLink>
                        </div>
                    )
                }
            })}
            <div className="footer-mobile__item-wrapper" >
                <Login />
            </div>
        </div>
    )
}