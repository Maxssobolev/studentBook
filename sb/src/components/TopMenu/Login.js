import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as UserIcon } from '../../assets/img/top-menu/user.svg'

export default function Login() {
    return (
        <NavLink to='/lk' className="login" activeClassName="active">
            <UserIcon className="login__icon" />
        </NavLink>
    )
}