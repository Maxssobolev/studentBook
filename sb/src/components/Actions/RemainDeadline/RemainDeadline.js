import React from 'react';


export default function RemainDedaline({ current, progress }) {

    return (

        <div className="deadline-circle">
            <div className="circle-diagram-wrapper">
                <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut">
                    <defs>
                        <linearGradient id="linear"
                            x1="0%"
                            y1="0%"

                            y2="100%">
                            <stop offset="0%" stopColor="rgba(52, 128, 192, 1)" />
                            <stop offset={`${progress}%`} stopColor="var(--accent)" />
                        </linearGradient>
                    </defs>
                    <circle className="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
                    <circle className="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="rgba(239, 239, 239, 1)" strokeWidth="5"></circle>

                    <circle className="donut-segment" cx="21" cy="21"
                        r="15.91549430918954" fill="transparent"
                        stroke="url(#linear)" strokeWidth="5"
                        /* здесь первое значение (в процентах)  - синий круг (filling) */
                        strokeDasharray={[progress, 100 - progress]}
                        strokeDashoffset="25"
                        strokeLinecap="round"></circle>


                    <g className="chart-text">
                        <text x="50%" y="50%" className="chart-number">
                            {current}
                        </text>
                    </g>
                </svg>
            </div>
        </div>

    )
}