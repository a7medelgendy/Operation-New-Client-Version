import React, { useRef } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import "../../styles/dashboard/dashboard.css";



export default function BarChartComp(props) {
    const instance = useRef(null);
    const BAR_LABEL_ROUTA = {
        title: {
            text: props.data.title,
            top: 0,
            left: 'center',
            textStyle: {
                fontSize: 24,
                fontWeight: 'bold',
                fontFamily: 'roboto'

            }
        },
        grid: {
            top: 90, // Adjust the top margin to make room for the title
            bottom: 20, // Adjust the bottom margin to make room for the legend
            left: 50,
            right: 50
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        legend: {
            top: 50,
            data: props.data.legend,
            left: 'center',
            orient: 'horizontal'
        },
        toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ["line", "bar", "stack"] },
                restore: { show: true },
                saveAsImage: { show: true },
            },
        },
        xAxis: [
            {
                type: "category",
                axisTick: { show: false },
                data: props.data.xAxis,
            },
        ],
        yAxis: [
            {
                type: "value",
            },
        ],
        series: props.data.series,
    };

    return (
        <div className="d-flex align-items-stretch dashboard-chart" >
            <ReactEChartsCore
                ref={instance}
                echarts={props.echarts}
                option={BAR_LABEL_ROUTA}
                notMerge={true}
                lazyUpdate={true}
                className="chart"
            />
        </div >
    );
}
