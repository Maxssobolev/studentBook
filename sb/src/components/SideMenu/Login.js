import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ReactComponent as UserIcon } from '../../assets/img/top-menu/user.svg'

export default function Login() {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.user.isLogged)

    return (
        <NavLink
            to='/lk'
            activeClassName=''
            className="sideMenu__item"
            data-title={'Личный кабинет'}
        >
            <UserIcon />
        </NavLink>
    )
}