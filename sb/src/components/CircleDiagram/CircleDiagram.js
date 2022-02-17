import React from 'react'
import Chart from "react-apexcharts";

export default function CircleDiagram({ percentOfFilling, current }) {
    const colors = percentOfFilling < 51 ?
        ['var(--accent)', '#C0DCFC'] //меньше половины 
        :
        percentOfFilling > 51 && percentOfFilling < 75 ?
            ['var(--accent)', '#C0DCFC'] //середина прошла 
            :
            ['var(--accent)', '#C0DCFC'] //скоро конец

    const options = {
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '35%',

                }
            },
        },
        colors: ["#000"],
        fill: {
            colors: colors
        },

        labels: [current],

    }
    const series = [percentOfFilling]


    return (
        <div className="circle-diagram-wrapper" >
            <Chart
                options={options}
                series={series}
                type="radialBar"
                height="110"
            />
        </div >
    );
}




