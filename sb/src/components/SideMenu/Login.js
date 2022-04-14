import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as UserIcon } from '../../assets/img/top-menu/user.svg'

export default function Login() {

    return (
        <NavLink
            to='/lk'
            activeClassName='active'
            className="sideMenu__item"
            data-title={'Личный кабинет'}
        >
            <UserIcon />
        </NavLink>
    )
}