import React, { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import "../styles/dashboard/dashboard.css";
import { baseUrl } from "../shared/staticData";

const DEFAULT_OPTION = {
  title: {
    text:'Hello Echarts-for-react.',
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data:['test1', 'test2']
  },
  toolbox: {
    show: true,
    feature: {
      dataView: {readOnly: false},
      restore: {},
      saveAsImage: {}
    }
  },
  grid: {
    top: 60,
    left: 30,
    right: 60,
    bottom:30
  },
  dataZoom: {
    show: false,
    start: 0,
    end: 100
  },
  visualMap: {
    show: false,
    min: 0,
    max: 1000,
    color: ['#BE002F', '#F20C00', '#F00056', '#FF2D51', '#FF2121', '#FF4C00', '#FF7500',
      '#FF8936', '#FFA400', '#F0C239', '#FFF143', '#FAFF72', '#C9DD22', '#AFDD22',
      '#9ED900', '#00E500', '#0EB83A', '#0AA344', '#0C8918', '#057748', '#177CB0']
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      data: (function (){
        let now = new Date();
        let res = [];
        let len = 50;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
          now = new Date(now - 2000);
        }
        return res;
      })()
    },
    {
      type: 'category',
      boundaryGap: true,
      data: (function (){
        let res = [];
        let len = 50;
        while (len--) {
          res.push(50 - len + 1);
        }
        return res;
      })()
    }
  ],
  yAxis: [
    {
      type: 'value',
      scale: true,
      name: 'test1',
      max: 20,
      min: 0,
      boundaryGap: [0.2, 0.2]
    },
    {
      type: 'value',
      scale: true,
      name: 'test2',
      max: 1200,
      min: 0,
      boundaryGap: [0.2, 0.2]
    }
  ],
  series: [
    {
      name:'test1',
      type:'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      itemStyle: {
        normal: {
          barBorderRadius: 4,
        }
      },
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return idx * 10;
      },
      animationDelayUpdate: function (idx) {
        return idx * 10;
      },
      data:(function (){
        let res = [];
        let len = 50;
        while (len--) {
          res.push(Math.round(Math.random() * 1000));
        }
        return res;
      })()
    },
    {
      name:'test2',
      type:'line',
      data:(function (){
        let res = [];
        let len = 0;
        while (len < 50) {
          res.push((Math.random()*10 + 5).toFixed(1) - 0);
          len++;
        }
        return res;
      })()
    }
  ]
}

const BAR_CHART_OPTION = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    }
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  legend: {
    data: ['Evaporation', 'Precipitation', 'Temperature']
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Precipitation',
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: 'Temperature',
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: '{value} °C'
      }
    }
  ],
  series: [
    {
      name: 'Evaporation',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' ml';
        }
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: 'Precipitation',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' ml';
        }
      },
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ]
    },
    {
      name: 'Temperature',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + ' °C';
        }
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
  
}

function DashBoardCard(props) {
  return (
    <div
      className={
        "d-flex justify-content-center align-items-center dahsboard-card " +
        props.cardStyle
      }
    >
      <p>{props.label}</p>
    </div>
  );
}

function LiveChart() {
  const instance = useRef(null);
  const [option, setOption] = useState(DEFAULT_OPTION);
  
  let count;

  function fetchNewData() {
    const axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
    const newOption = JSON.parse(JSON.stringify(option)); // immutable
    newOption.title.text = 'Hello Echarts-for-react.' + new Date().getSeconds();
    const data0 = newOption.series[0].data;
    const data1 = newOption.series[1].data;
    data0.shift();
    data0.push(Math.round(Math.random() * 1000));
    data1.shift();
    data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

    newOption.xAxis[0].data.shift();
    newOption.xAxis[0].data.push(axisData);
    newOption.xAxis[1].data.shift();
    newOption.xAxis[1].data.push(count++);

    setOption(newOption);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      fetchNewData();
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <div className="d-flex align-items-stretch dashboard-chart">
      <ReactECharts ref={instance} option={option} className="chart" />
    </div>
  );
}

function Chart() {
  const instance = useRef(null);
  
  return (
    <div className="d-flex align-items-stretch dashboard-chart">
      <ReactECharts ref={instance} option={BAR_CHART_OPTION} className="chart"/>
    </div>
  );
}

export default function Dashboard(props) {
  let [isLoading, updateLoader] = useState(true);

  useEffect(() => {}, [isLoading]);

  return (
    <div className="container-fluid dashboard-container">
      <div className="row dashboard-row-distance">
        <div className="col card-container">
          <DashBoardCard cardStyle={"card1"} label={"Inprogress"} />
        </div>
        <div className="col card-container">
          <DashBoardCard cardStyle={"card2"} label={"Completed"} />
        </div>
        <div className="col card-container">
          <DashBoardCard cardStyle={"card3"} label={"58"} />
        </div>
        <div className="col card-container">
          <DashBoardCard cardStyle={"card4"} label={"101"} />
        </div>
      </div>

      <div className="row dashboard-row-distance">
        <div className="col chart-container">
          <Chart />
        </div>
        <div className="col chart-container">
          <Chart />
        </div>
      </div>

      <div className="row dashboard-row-distance">
        <div className="col chart-container">
          <Chart />
        </div>
        <div className="col chart-container">
          <Chart />
        </div>
      </div>

      <div className="row pb-4">
        <div className="col chart-container">
          <LiveChart />
        </div>
      </div>
    </div>
  );
}
