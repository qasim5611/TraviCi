import React from 'react';
import Chart from 'react-apexcharts';

export default class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        colors: ['#fd612c'],
        chart: {
          toolbar: {
            show: false,
          },
        },
        grid: {
          show: false,
        },
        xaxis: {
          floating: true,
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            show: false,
          },
        },
        yaxis: {
          floating: true,
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            show: false,
          },
        },
      },
      series: [
        {
          name: 'series-1',
          data: [30, 50, 35, 80, 55, 100, 75],
        },
      ],
    };
  }

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          width="125"
          height="80"
        />
      </div>
    );
  }
}
