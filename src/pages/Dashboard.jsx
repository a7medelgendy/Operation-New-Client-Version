import React, { useEffect, useState } from 'react';
import ChartHandler from '../components/charts';
import Cards from '../components/charts/Cards';
import { useToasts } from 'react-toast-notifications';
import { handleRequest } from '../utilites/handleApiRequest';
import user from '../shared/user';

var app = {};

const posList = ['left', 'right', 'top', 'bottom', 'inside', 'insideTop', 'insideLeft', 'insideRight', 'insideBottom', 'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'];

app.configParameters = {
  rotate: {
    min: -90,
    max: 90
  },
  align: {
    options: {
      left: 'left',
      center: 'center',
      right: 'right'
    }
  },
  verticalAlign: {
    options: {
      top: 'top',
      middle: 'middle',
      bottom: 'bottom'
    }
  },
  position: {
    options: posList.reduce(function (map, pos) {
      map[pos] = pos;
      return map;
    }, {})
  },
  distance: {
    min: 0,
    max: 100
  }
};
app.config = {
  rotate: 90,
  align: 'left',
  verticalAlign: 'middle',
  position: 'insideBottom',
  distance: 15,
  onChange: function () {
    // const labelOption = {
    //   rotate: app.config.rotate,
    //   align: app.config.align,
    //   verticalAlign: app.config.verticalAlign,
    //   position: app.config.position,
    //   distance: app.config.distance
    // };
  }
};
const labelOption = {
  show: false,
  position: app.config.position,
  distance: app.config.distance,
  align: app.config.align,
  verticalAlign: app.config.verticalAlign,
  rotate: app.config.rotate,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {}
  }
};

export default function Dashboard(props) {
  //const [isLoading, updateLoader] = useState(true);
  const [cardsData, setCardsData] = useState(null);
  const [departmentStatusChart, setDepartmentStatusChart] = useState(null);
  const [topEquipmentChart, setTopEquipmentChart] = useState(null);
  const [topOperationUnitsChart, setTopOperationUnitsChart] = useState(null);
  const [operationUnitsLogsChart, setOperationUnitsLogsChart] = useState(null);
  const [unitsLogChart, setUnitsLogChart] = useState(null);
  const { addToast } = useToasts();
  const getBarChartData = async () => {
    const response = await handleRequest('GET', 'api/dashboard');
    if (response) {
      let data = response.result;
      if (data.hasOwnProperty('cards')) {
        //let cards = JSON.parse(JSON.stringify(data.cards));
        setCardsData(data.cards);
      }

      if (data.hasOwnProperty('charts')) {
        const colors = ['#2e7d32', '#ed6c02', '#d32f2f'];
        let charts = data.charts;
        if (charts.hasOwnProperty('departementChart')) {
          let series = charts.departementChart.series.map((ele, idx) => {
            var x = {
              ...ele,
              type: 'bar',
              barGap: 0,
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              color: colors[idx]
            };

            return x;
          });

          let chart = {
            title: 'Maintenance work orders according to the execution department.',
            xAxis: charts.departementChart.edarat,
            legend: charts.departementChart.status,
            series: series
          };

          setDepartmentStatusChart(chart);
        }
        if (charts.hasOwnProperty('topEquipmentChart')) {
          let chart = {
            text: 'Top equipments have work orders',
            subtext: '',
            values: charts.topEquipmentChart,
            radius: '65%',
            customClass: 'top-equipments'
          };
          setTopEquipmentChart(chart);
        }
        if (charts.hasOwnProperty('shiftLogChart')) {
          let chart = {
            text: '   Total work orders per shift',
            subtext: '',
            values: charts.shiftLogChart,
            radius: ['40%', '60%']
          };
          setTopOperationUnitsChart(chart);
        }

        if (charts.hasOwnProperty('operationUnitsLogsChart')) {
          let chart = {
            text: ' Units according all work orders',
            subtext: '',
            values: charts.operationUnitsLogsChart,
            radius: ['40%', '60%'],
            //left: "center", //title position (can add margin left 28%)
            charPosition: ['50%', '45%', '50%', '50%']
          };
          setOperationUnitsLogsChart(chart);
        }

        if (charts.hasOwnProperty('unitsLogChart')) {
          let series = charts.unitsLogChart.series.map((ele, idx) => {
            var x = {
              ...ele,
              type: 'bar',
              barGap: 0,
              label: labelOption,
              emphasis: {
                focus: 'series'
              },
              color: colors[idx]
            };

            return x;
          });

          let chart = {
            title: 'Maintenance work orders according to the Units.',
            xAxis: charts.unitsLogChart.Units,
            legend: charts.unitsLogChart.status,
            series: series
          };

          setUnitsLogChart(chart);
        }
      }
    } else {
      addToast('Oops! Kindly contact to SoftWare Engineer(dashboard)', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 4000 });
      return false;
    }
  };

  useEffect(() => {
    getBarChartData();
  }, []);

  let cards = null;
  if (cardsData != null) {
    cards = cardsData.map((ele, idx) => {
      return (
        <div key={idx} className='col card-container'>
          <Cards cardStyle={ele.TXT_STATUS} title={ele.TXT_STATUS} value={ele.count} />
        </div>
      );
    });
  }

  return (
    <div className='container-fluid dashboard-container'>
      <div className='row dashboard-row-distance d-flex justify-content-center align-items-center mb-4'>{cards}</div>
      {departmentStatusChart && (
        <div className='row dashboard-row-distance d-flex justify-content-center align-items-center mb-4'>
          <div className='col '>
            <ChartHandler data={departmentStatusChart} type={'bar-chart'} />
          </div>
        </div>
      )}
      {departmentStatusChart && (
        <div className='row dashboard-row-distance mb-4'>
          <div className='col '>
            <ChartHandler data={topEquipmentChart} type={'pie-chart'} />
          </div>
        </div>
      )}

      {topOperationUnitsChart && operationUnitsLogsChart && (
        <div className='row dashboard-row-distance mb-4'>
          <div className='col-12 col-xl-6'>
            <ChartHandler data={topOperationUnitsChart} type={'pie-chart'} />
          </div>
          <div className='col-12 col-xl-6'>
            <ChartHandler data={operationUnitsLogsChart} type={'pie-chart'} />
          </div>
        </div>
      )}
      {unitsLogChart && (
        <div className='row dashboard-row-distance mb-4'>
          <div className='col'>
            <ChartHandler data={unitsLogChart} type={'bar-chart'} />
          </div>
        </div>
      )}
    </div>
  );
}
