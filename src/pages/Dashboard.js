import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// import the core library.
import ReactEChartsCore from "echarts-for-react/lib/core";
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from "echarts/core";
// Import charts, all with Chart suffix
import {
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  RadarChart,
  MapChart,
  TreeChart,
  TreemapChart,
  GraphChart,
  GaugeChart,
  FunnelChart,
  ParallelChart,
  SankeyChart,
  BoxplotChart,
  CandlestickChart,
  EffectScatterChart,
  LinesChart,
  HeatmapChart,
  PictorialBarChart,
  ThemeRiverChart,
  SunburstChart,
  CustomChart,
} from "echarts/charts";
// import components, all suffixed with Component
import {
  GridSimpleComponent,
  GridComponent,
  PolarComponent,
  RadarComponent,
  GeoComponent,
  SingleAxisComponent,
  ParallelComponent,
  CalendarComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
  LegendScrollComponent,
  LegendPlainComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
  TransformComponent,
} from "echarts/components";

// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";

import "../styles/dashboard/dashboard.css";
import { baseUrl } from "../shared/staticData";

// Register the required components
echarts.use([
  GridSimpleComponent,
  GridComponent,
  PolarComponent,
  RadarComponent,
  GeoComponent,
  SingleAxisComponent,
  ParallelComponent,
  CalendarComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,
  LegendScrollComponent,
  LegendPlainComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  AriaComponent,
  TransformComponent,

  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  RadarChart,
  MapChart,
  TreeChart,
  TreemapChart,
  GraphChart,
  GaugeChart,
  FunnelChart,
  ParallelChart,
  SankeyChart,
  BoxplotChart,
  CandlestickChart,
  EffectScatterChart,
  LinesChart,
  HeatmapChart,
  PictorialBarChart,
  ThemeRiverChart,
  SunburstChart,
  CustomChart,

  CanvasRenderer,
  SVGRenderer,
]);

const DEFAULT_OPTION = {
  title: {
    text: "Hello Echarts-for-react.",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["test1", "test2"],
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {},
    },
  },
  grid: {
    top: 60,
    left: 30,
    right: 60,
    bottom: 30,
  },
  dataZoom: {
    show: false,
    start: 0,
    end: 100,
  },
  visualMap: {
    show: false,
    min: 0,
    max: 1000,
    color: [
      "#BE002F",
      "#F20C00",
      "#F00056",
      "#FF2D51",
      "#FF2121",
      "#FF4C00",
      "#FF7500",
      "#FF8936",
      "#FFA400",
      "#F0C239",
      "#FFF143",
      "#FAFF72",
      "#C9DD22",
      "#AFDD22",
      "#9ED900",
      "#00E500",
      "#0EB83A",
      "#0AA344",
      "#0C8918",
      "#057748",
      "#177CB0",
    ],
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: true,
      data: (function () {
        let now = new Date();
        let res = [];
        let len = 50;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
          now = new Date(now - 2000);
        }
        return res;
      })(),
    },
    {
      type: "category",
      boundaryGap: true,
      data: (function () {
        let res = [];
        let len = 50;
        while (len--) {
          res.push(50 - len + 1);
        }
        return res;
      })(),
    },
  ],
  yAxis: [
    {
      type: "value",
      scale: true,
      name: "test1",
      max: 20,
      min: 0,
      boundaryGap: [0.2, 0.2],
    },
    {
      type: "value",
      scale: true,
      name: "test2",
      max: 1200,
      min: 0,
      boundaryGap: [0.2, 0.2],
    },
  ],
  series: [
    {
      name: "test1",
      type: "bar",
      xAxisIndex: 1,
      yAxisIndex: 1,
      itemStyle: {
        normal: {
          barBorderRadius: 4,
        },
      },
      animationEasing: "elasticOut",
      animationDelay: function (idx) {
        return idx * 10;
      },
      animationDelayUpdate: function (idx) {
        return idx * 10;
      },
      data: (function () {
        let res = [];
        let len = 50;
        while (len--) {
          res.push(Math.round(Math.random() * 1000));
        }
        return res;
      })(),
    },
    {
      name: "test2",
      type: "line",
      data: (function () {
        let res = [];
        let len = 0;
        while (len < 50) {
          res.push((Math.random() * 10 + 5).toFixed(1) - 0);
          len++;
        }
        return res;
      })(),
    },
  ],
};

const BAR_CHART_OPTION = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ["line", "bar"] },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  legend: {
    data: ["Evaporation", "Precipitation", "Temperature"],
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisPointer: {
        type: "shadow",
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "Precipitation",
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: "{value} ml",
      },
    },
    {
      type: "value",
      name: "Temperature",
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: "{value} °C",
      },
    },
  ],
  series: [
    {
      name: "Evaporation",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + " ml";
        },
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
      ],
    },
    {
      name: "Precipitation",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + " ml";
        },
      },
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
      ],
    },
    {
      name: "Temperature",
      type: "line",
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + " °C";
        },
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
    },
  ],
};

const PIE_CHART_OPTION = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "40",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
};

const ZONE_CHART_OPTION = {
  tooltip: {},
  geo: {
    map: "ksia-ext-plan",
    roam: true,
    layoutCenter: ["50%", "50%"],
    layoutSize: "100%",
  },
  series: [
    {
      name: "Route",
      type: "lines",
      coordinateSystem: "geo",
      geoIndex: 0,
      emphasis: {
        label: {
          show: false,
        },
      },
      polyline: true,
      lineStyle: {
        color: "#c46e54",
        width: 0,
      },
      effect: {
        show: true,
        period: 8,
        color: "#a10000",
        // constantSpeed: 80,
        trailLength: 0,
        symbolSize: [12, 30],
        symbol:
          "path://M87.1667 3.8333L80.5.5h-60l-6.6667 3.3333L.5 70.5v130l10 10h80l10 -10v-130zM15.5 190.5l15 -20h40l15 20zm75 -65l-15 5v35l15 15zm-80 0l15 5v35l-15 15zm65 0l15 -5v-40l-15 20zm-50 0l-15 -5v-40l15 20zm 65,-55 -15,25 c -15,-5 -35,-5 -50,0 l -15,-25 c 25,-15 55,-15 80,0 z",
      },
      z: 100,
      data: [
        {
          effect: {
            color: "#a10000",
            constantSpeed: 100,
            delay: 0,
          },
          coords: [
            [50.875133928571415, 242.66287667410717],
            [62.03696428571425, 264.482421875],
            [72.63357421874997, 273.62779017857144],
            [92.78291852678569, 285.869140625],
            [113.43637834821425, 287.21854073660717],
            [141.44788783482142, 288.92947823660717],
            [191.71686104910714, 289.5507114955357],
            [198.3060072544643, 294.0673828125],
            [204.99699497767858, 304.60288783482144],
            [210.79177734375003, 316.7373046875],
            [212.45179408482142, 329.3656529017857],
            [210.8885267857143, 443.3925083705358],
            [215.35936941964286, 453.00634765625],
            [224.38761997767858, 452.15087890625],
            [265.71490792410714, 452.20179966517856],
            [493.3408844866072, 453.77525111607144],
            [572.8892940848216, 448.77992466517856],
            [608.9513755580358, 448.43366350446433],
            [619.99099609375, 450.8778599330358],
            [624.2479715401787, 456.2194475446429],
            [628.1434095982145, 463.9899553571429],
            [629.8492550223216, 476.0276227678571],
            [631.2750362723216, 535.7322126116071],
            [624.6757059151787, 546.6496233258929],
            [617.1801702008929, 552.6480887276786],
            [603.7269056919645, 554.5066964285714],
            [588.0178515625, 557.5517578125],
            [529.4386104910716, 556.2991071428571],
            [422.1994921875001, 551.38525390625],
            [291.66921875, 552.5767996651786],
            [219.4279380580357, 547.4949079241071],
            [209.53912667410714, 541.5931919642858],
            [206.70793247767858, 526.1947544642858],
            [206.70793247767858, 507.4049944196429],
            [206.12234375000003, 468.7663225446429],
            [204.48778738839286, 459.44782366071433],
            [197.56256417410714, 452.8943219866071],
            [170.31995814732142, 456.27546037946433],
            [1.8078906249999704, 460.5935407366071],
          ],
        },
        {
          effect: {
            color: "#00067d",
            constantSpeed: 80,
            delay: 0,
          },
          coords: [
            [779.4595368303574, 287.98744419642856],
            [689.07009765625, 291.0477818080357],
            [301.83300223214286, 290.49783761160717],
            [229.31165736607142, 291.73011997767856],
            [220.73660156250003, 297.4077845982143],
            [214.74832031250003, 308.52378627232144],
            [213.82156250000003, 421.35400390625],
            [213.19523716517858, 443.0564313616071],
            [222.31005301339286, 455.95465959821433],
            [271.71846540178575, 454.37611607142856],
            [359.64843191964286, 455.9393833705358],
            [580.2524358258929, 448.11286272321433],
            [627.7156752232145, 460.7463030133929],
            [632.3290959821429, 536.6386021205358],
            [628.9123130580358, 548.4776785714286],
            [612.5667494419645, 556.8235909598214],
            [543.7167912946429, 555.4741908482143],
            [429.1756361607143, 551.9402901785714],
            [293.42089285714286, 551.2172154017858],
            [226.20039899553575, 556.0699637276786],
            [215.49176339285714, 562.7253069196429],
            [213.21051339285714, 591.6024693080358],
            [212.00878348214286, 625.6735491071429],
            [197.43017020089286, 645.0743582589286],
            [187.41405691964286, 647.0857282366071],
            [101.79589285714286, 649.0207170758929],
            [69.96023437499997, 650.1613420758929],
            [56.48150948660714, 656.8268694196429],
            [51.11446149553569, 665.2542550223214],
          ],
        },
        {
          effect: {
            color: "#997405",
            constantSpeed: 60,
            delay: 0,
          },
          coords: [
            [2.5920703124999704, 450.66908482142856],
            [204.0651450892857, 453.13364955357144],
            [378.72844029017864, 453.13874162946433],
            [551.1817745535716, 456.1532505580358],
            [578.3734598214287, 456.91196986607144],
            [601.2317885044645, 458.9895368303571],
            [614.1503850446429, 462.1669921875],
            [618.99294921875, 479.68882533482144],
            [620.0826534598216, 513.5969587053571],
            [615.6932840401787, 528.7306082589286],
            [608.4829045758929, 533.2625558035714],
            [592.7127455357145, 534.9582170758929],
            [583.09890625, 527.5492466517858],
            [578.6535239955358, 516.4077845982143],
            [578.6535239955358, 498.36146763392856],
            [577.9966462053571, 477.0613141741071],
            [575.3691350446429, 469.1940569196429],
            [569.0753292410716, 462.63037109375],
            [553.9518638392858, 460.6444614955358],
            [298.10051060267864, 465.61432756696433],
            [193.49908761160714, 460.1759905133929],
            [116.40505859374997, 465.78236607142856],
            [3.5137360491071092, 463.47565569196433],
          ],
        },
      ],
    },
  ],
};

const gaugeData = [
  {
    value: 20,
    name: "Good",
    title: {
      offsetCenter: ["-40%", "80%"],
    },
    detail: {
      offsetCenter: ["-40%", "95%"],
    },
  },
  {
    value: 40,
    name: "Better",
    title: {
      offsetCenter: ["0%", "80%"],
    },
    detail: {
      offsetCenter: ["0%", "95%"],
    },
  },
  {
    value: 60,
    name: "Perfect",
    title: {
      offsetCenter: ["40%", "80%"],
    },
    detail: {
      offsetCenter: ["40%", "95%"],
    },
  },
];
const GUAGE_CHART_OPTION = {
  series: [
    {
      type: "gauge",
      anchor: {
        show: true,
        showAbove: true,
        size: 18,
        itemStyle: {
          color: "#FAC858",
        },
      },
      pointer: {
        icon: "path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z",
        width: 8,
        length: "80%",
        offsetCenter: [0, "8%"],
      },
      progress: {
        show: true,
        overlap: true,
        roundCap: true,
      },
      axisLine: {
        roundCap: true,
      },
      data: gaugeData,
      title: {
        fontSize: 14,
      },
      detail: {
        width: 40,
        height: 14,
        fontSize: 14,
        color: "#fff",
        backgroundColor: "auto",
        borderRadius: 3,
        formatter: "{value}%",
      },
    },
  ],
};

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
  show: true,
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

const BAR_LABEL_ROUTA = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    data: ["Forest", "Steppe", "Desert", "Wetland"],
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
      data: ["2012", "2013", "2014", "2015", "2016"],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "Forest",
      type: "bar",
      barGap: 0,
      label: labelOption,
      emphasis: {
        focus: "series",
      },
      data: [320, 332, 301, 334, 390],
    },
    {
      name: "Steppe",
      type: "bar",
      label: labelOption,
      emphasis: {
        focus: "series",
      },
      data: [220, 182, 191, 234, 290],
    },
    {
      name: "Desert",
      type: "bar",
      label: labelOption,
      emphasis: {
        focus: "series",
      },
      data: [150, 232, 201, 154, 190],
    },
    {
      name: "Wetland",
      type: "bar",
      label: labelOption,
      emphasis: {
        focus: "series",
      },
      data: [98, 77, 101, 99, 40],
    },
  ],
};

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

function ZoneChart(props) {
  const instance = useRef(null);
  // echarts.registerMap("ksia-ext-plan", { svg: MapReact });

  return (
    <div className="d-flex align-items-stretch dashboard-chart">
      <ReactEChartsCore
        ref={instance}
        echarts={echarts}
        option={props.option}
        notMerge={true}
        lazyUpdate={true}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
}

function LiveChart() {
  const instance = useRef(null);
  const [option, setOption] = useState(DEFAULT_OPTION);

  let count;

  function fetchNewData() {
    const axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
    const newOption = JSON.parse(JSON.stringify(option)); // immutable
    newOption.title.text =
      "Anrpc live graph analysis." + new Date().getSeconds();
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
      <ReactEChartsCore
        ref={instance}
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        className="chart"
      />
    </div>
  );
}

function Chart(props) {
  const instance = useRef(null);

  return (
    <div className="d-flex align-items-stretch dashboard-chart">
      <ReactEChartsCore
        ref={instance}
        echarts={echarts}
        option={props.option}
        notMerge={true}
        lazyUpdate={true}
        className="chart"
      />
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
          <Chart option={BAR_CHART_OPTION} />
        </div>
        <div className="col chart-container">
          <Chart option={PIE_CHART_OPTION} />
        </div>
      </div>

      <div className="row dashboard-row-distance">
        <div className="col chart-container">
          <Chart option={GUAGE_CHART_OPTION} />
        </div>
        <div className="col chart-container">
          <Chart option={BAR_LABEL_ROUTA} />
        </div>
      </div>

      <div className="row dashboard-row-distance">
        <div className="col chart-container">
          <LiveChart />
        </div>
      </div>

      <div className="row pb-5">
        <div className="col chart-container">
          {/* <ZoneChart option={ZONE_CHART_OPTION} /> */}
        </div>
      </div>
    </div>
  );
}
