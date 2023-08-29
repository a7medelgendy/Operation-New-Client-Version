import React, { useRef } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import "../../styles/dashboard/dashboard.css";

export default function PieChartComp(props) {
    const instance = useRef(null);

    var option = {
        title: {
            text: 'Referer of a Website',
            subtext: 'Fake Data',
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
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ],
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