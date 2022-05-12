import React from 'react';
import { Container } from 'react-bootstrap';
import '../../assets/scss/topMenu.scss'

import { ReactComponent as LogoIcon } from '../../assets/img/top-menu/bank.svg'

//файл со всеми надписями
import { TEXT } from '../../config/text/text';
import TimeTable from '../TimeTable/TimeTable';
import FullTimeTable from '../FullTimeTable/FullTimeTable';

export default function TopMenu() {

    return (
        <Container className="topMenu">
            <div className="logo">
                <div className="logo__title">{TEXT.logo} <LogoIcon /> </div>
                <div className="logo__subtitle">{TEXT.group.toUpperCase()}</div>
            </div>
            <TimeTable />

            <FullTimeTable />
        </Container>
    )
}