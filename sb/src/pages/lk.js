import React, { useEffect, useState } from 'react';
import { cookies } from '../index'
import { ReactComponent as UserPlaceholder } from '../assets/img/top-menu/user.svg'
import Button from '../components/Button/Button';
import { Link } from 'react-router-dom';
import useQuery from '../components/Hooks/useQuery';
import { $authHost } from '../http/index'
export default function LkPage() {
    const user = cookies.get('user')

    const query = useQuery()

    const token = query.get('token')
    const isJustLogged = query.get('logged')
    const [mount, setMount] = useState(false)


    useEffect(() => {
        if (token && isJustLogged) {
            cookies.set('token', token)
            $authHost.get('/api/user/get').then(({ data }) => { cookies.set('user', data); setMount(true) })
        }
    }, [query])


    if (!user && !mount) {
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

