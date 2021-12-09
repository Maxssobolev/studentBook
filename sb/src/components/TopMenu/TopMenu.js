import React from 'react';
import { Container } from 'react-bootstrap';
import '../../assets/scss/topMenu.scss'
import Login from './Login';

//файл со всеми надписями
import { TEXT } from '../../config/text/text';

export default function TopMenu() {

    return (
        <Container className="topMenu">
            <div className="logo">
                <div className="logo__title">{TEXT.logo}</div>
                <div className="logo__subtitle">{TEXT.group.toUpperCase()}</div>
            </div>
            <Login />
        </Container>
    )
}