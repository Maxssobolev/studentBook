import React from 'react';
import FullTimeTable from '../../FullTimeTable/FullTimeTable';

import TimeTableMobile from '../TimeTableMobile/TimeTableMobile';

export default function TopMenuMobile() {

    return (

        <div className="topMenu-mobile">
            <TimeTableMobile />
            <FullTimeTable />
        </div>

    )
}