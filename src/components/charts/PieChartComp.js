import React, { useRef } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import "../../styles/dashboard/dashboard.css";

export default function PieChartComp(props) {
    const instance = useRef(null);

    var option = {
        title: {
            text: props.data.text,
            subtext: props.data.subtext,
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                //name: 'Access From',
                type: 'pie',
                radius: props.data.radius,
                data: props.data.values,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }

    return (
        <div className="d-flex align-items-stretch dashboard-chart">
            <ReactEChartsCore
                ref={instance}
                echarts={props.echarts}
                option={option}
                notMerge={true}
                lazyUpdate={true}
                className="chart"
            />

        </div>
    );
};