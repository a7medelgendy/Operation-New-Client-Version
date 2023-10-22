import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseUrl } from "../shared/staticData";
import ChartHandler from "../components/charts";
import Cards from "../components/charts/Cards";



var app = {};

const posList = [
    "left",
    "right",
    "top",
    "bottom",
    "inside",
    "insideTop",
    "insideLeft",
    "insideRight",
    "insideBottom",
    "insideTopLeft",
    "insideTopRight",
    "insideBottomLeft",
    "insideBottomRight",
];

app.configParameters = {
    rotate: {
        min: -90,
        max: 90,
    },
    align: {
        options: {
            left: "left",
            center: "center",
            right: "right",
        },
    },
    verticalAlign: {
        options: {
            top: "top",
            middle: "middle",
            bottom: "bottom",
        },
    },
    position: {
        options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            return map;
        }, {}),
    },
    distance: {
        min: 0,
        max: 100,
    },
};
app.config = {
    rotate: 90,
    align: "left",
    verticalAlign: "middle",
    position: "insideBottom",
    distance: 15,
    onChange: function () {
        const labelOption = {
            rotate: app.config.rotate,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            position: app.config.position,
            distance: app.config.distance,
        };
    },
};
const labelOption = {
    show: false,
    position: app.config.position,
    distance: app.config.distance,
    align: app.config.align,
    verticalAlign: app.config.verticalAlign,
    rotate: app.config.rotate,
    formatter: "{c}  {name|{a}}",
    fontSize: 16,
    rich: {
        name: {},
    },
};


// function ZoneChart(props) {
//   const instance = useRef(null);
//   // echarts.registerMap("ksia-ext-plan", { svg: MapReact });

//   return (
//     <div className="d-flex align-items-stretch dashboard-chart">
//       <ReactEChartsCore
//         ref={instance}
//         echarts={echarts}
//         option={props.option}
//         notMerge={true}
//         lazyUpdate={true}
//         opts={{ renderer: "svg" }}
//       />
//     </div>
//   );
// }

// function LiveChart() {
//   const instance = useRef(null);
//   const [option, setOption] = useState(DEFAULT_OPTION);

//   let count;

//   function fetchNewData() {
//     const axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
//     const newOption = JSON.parse(JSON.stringify(option)); // immutable
//     newOption.title.text =
//       "Anrpc live graph analysis." + new Date().getSeconds();
//     const data0 = newOption.series[0].data;
//     const data1 = newOption.series[1].data;
//     data0.shift();
//     data0.push(Math.round(Math.random() * 1000));
//     data1.shift();
//     data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

//     newOption.xAxis[0].data.shift();
//     newOption.xAxis[0].data.push(axisData);
//     newOption.xAxis[1].data.shift();
//     newOption.xAxis[1].data.push(count++);

//     setOption(newOption);
//   }

//   useEffect(() => {
//     const timer = setInterval(() => {
//       fetchNewData();
//     }, 1000);

//     return () => clearInterval(timer);
//   });

//   return (
//     <div className="d-flex align-items-stretch dashboard-chart">
//       <ReactEChartsCore
//         ref={instance}
//         echarts={echarts}
//         option={option}
//         notMerge={true}
//         lazyUpdate={true}
//         className="chart"
//       />
//     </div>
//   );
// }

export default function Dashboard(props) {
    const [isLoading, updateLoader] = useState(true);
    const [cardsData, setCardsData] = useState(null);
    const [departmentStatusChart, setDepartmentStatusChart] = useState(null);
    const [topEquipmentChart, setTopEquipmentChart] = useState(null);
    const [topOperationUnitsChart, setTopOperationUnitsChart] = useState(null);
    const [operationUnitsLogsChart, setOperationUnitsLogsChart] = useState(null);
    const [unitsLogChart, setUnitsLogChart] = useState(null);
    const getBarChartData = () => {
        axios({
            method: "get",
            url: baseUrl + "/api/dashboard",
            config: { headers: { "Content-Type": "multipart/form-data" } },
        })
            .then(function (res) {
                //handle success
                if ((res.status = 200)) {
                    let data = res.data.result;
                    if (data.hasOwnProperty("cards")) {
                        //let cards = JSON.parse(JSON.stringify(data.cards));
                        setCardsData(data.cards);
                    }


                    if (data.hasOwnProperty("charts")) {
                        const colors = ["#2e7d32", '#ed6c02', '#d32f2f'];
                        let charts = data.charts;
                        if (charts.hasOwnProperty("departementChart")) {
                            let series = charts.departementChart.series.map((ele, idx) => {
                                var x = {
                                    ...ele,
                                    type: "bar",
                                    barGap: 0,
                                    label: labelOption,
                                    emphasis: {
                                        focus: "series",
                                    },
                                    color: colors[idx]
                                };

                                return x;
                            });

                            let chart = {
                                xAxis: charts.departementChart.edarat,
                                legend: charts.departementChart.status,
                                series: series,
                            };

                            setDepartmentStatusChart(chart);
                        }
                        if (charts.hasOwnProperty("topEquipmentChart")) {
                            let chart = {
                                text: "Top Equipment Chart",
                                subtext: "",
                                values: charts.topEquipmentChart,
                                radius: "70%"
                            }
                            setTopEquipmentChart(chart);
                        }
                        if (charts.hasOwnProperty("compeletedOperationUnitsChart")) {
                            let chart = {
                                text: " Units According Compeleted Work orders",
                                subtext: "",
                                values: charts.compeletedOperationUnitsChart,
                                radius: "40%"
                            }
                            setTopOperationUnitsChart(chart);
                        }

                        if (charts.hasOwnProperty("operationUnitsLogsChart")) {
                            let chart = {
                                text: " Units according All Work orders",
                                subtext: "",
                                values: charts.operationUnitsLogsChart,
                                radius: "40%"
                            }
                            setOperationUnitsLogsChart(chart);
                        }

                        if (charts.hasOwnProperty("unitsLogChart")) {
                            let series = charts.unitsLogChart.series.map((ele, idx) => {
                                var x = {
                                    ...ele,
                                    type: "bar",
                                    barGap: 0,
                                    label: labelOption,
                                    emphasis: {
                                        focus: "series",
                                    },
                                    color: colors[idx]
                                };

                                return x;
                            });

                            let chart = {
                                xAxis: charts.unitsLogChart.Units,
                                legend: charts.unitsLogChart.status,
                                series: series,
                            };

                            setUnitsLogChart(chart);
                        }

                    }
                    updateLoader(false);
                } else {
                    //setError(" Error user name or password");
                }
            })
            .catch(function (res) {
                //handle error
                // setError(" Error user name or password");
                return;
            });
    };

    useEffect(() => {
        getBarChartData();
    }, [isLoading]);

    let cards = null;
    if (cardsData != null) {
        cards = cardsData.map((ele, idx) => {
            return (
                <div key={idx} className="col card-container">
                    <Cards

                        cardStyle={"card" + (idx + 1)}
                        title={ele.TXT_STATUS}
                        value={ele.count}
                    />
                </div>
            );
        });
    }

    return (
        <div className="container-fluid dashboard-container">
            <div className="row dashboard-row-distance d-flex justify-content-center align-items-center">
                {cards}
            </div>

            {departmentStatusChart && (
                <div className="row dashboard-row-distance">
                    <h5 className="d-flex justify-content-center ">Maintenance Work orders according to the execution department. </h5>
                    <div className="col chart-container">
                        <ChartHandler data={departmentStatusChart} type={"bar-chart"} />
                    </div>
                </div>
            )}





            {departmentStatusChart && <div className="row dashboard-row-distance mb-3">
                <div className="col-12  chart-container">
                    <ChartHandler data={topEquipmentChart} type={"pie-chart"} />
                </div>

            </div>}



            {topOperationUnitsChart && operationUnitsLogsChart && <div className="row dashboard-row-distance mb-3">
                <div className="col-12 col-xl-6  chart-container">
                    <ChartHandler data={topOperationUnitsChart} type={"pie-chart"} />
                </div>
                <div className="col-12 col-xl-6  chart-container">
                    <ChartHandler data={operationUnitsLogsChart} type={"pie-chart"} />
                </div>
            </div>}

            {unitsLogChart && <div className="row dashboard-row-distance mb-3">
                <div className="col-12  chart-container">
                    <h5 className="d-flex justify-content-center p-10 ">Maintenance Work orders according to the Units. </h5>
                    <ChartHandler data={unitsLogChart} type={"bar-chart"} />
                </div>
            </div>}

        </div>
    );
}
