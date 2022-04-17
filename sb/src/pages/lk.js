import React from 'react';
import { cookies } from '../index'
import { ReactComponent as UserPlaceholder } from '../assets/img/top-menu/user.svg'
import Button from '../components/Button/Button';
import { Link } from 'react-router-dom';
export default function LkPage() {
    const justLogged = window.location.search.includes('logged') //means that user has just logged
    const user = cookies.get('user')


    if (!user) {
        return (
            <div className="page page-lk page-lk_login">
                <div className="avatar-placeholder">
                    <UserPlaceholder width={60} height={60} />
                </div>

                <a href={`${process.env.REACT_APP_API_URL}/api/user/auth/vk`}><Button text='Войти' /></a>
            </div>
        )
    }
    return (
        <div className="page page-lk">
            <div className="avatar-placeholder">
                <img src={user.avatarImage} alt="" />
            </div>
            <div className="welcome-message">
                {user.name}
            </div>
            <div className="controllers">
                <Link to='/admin'><Button text='Панель администратора' /></Link>
            </div>
        </div>
    )
}

