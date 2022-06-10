import AbstractView from './abstract-view.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { GetChartData } from '../utils/point-tools.js';
import { formatMinutesInterval } from '../utils/date-time';
import { ChartType } from '../const';

const renderChart = (ctx, labels, data, title, formatter, minLength = 50) => {
  new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: minLength,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: formatter,
        },
      },
      title: {
        display: true,
        text: title,
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatsTemplate = () => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time" width="900"></canvas>
    </div>
  </section>`
);

export default class StatsView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = [...points];
  }

  get template() {
    return createStatsTemplate(this.#points);
  }

  drawCharts = () => {
    const moneyCtx = document.querySelector('#money');
    const typeCtx = document.querySelector('#type');
    const timeCtx = document.querySelector('#time');

    const BAR_WIDTH = 200;
    moneyCtx.width = BAR_WIDTH * 5;
    typeCtx.width = BAR_WIDTH * 5;
    timeCtx.width = BAR_WIDTH * 5;

    const money = GetChartData(this.#points, ChartType.MONEY);
    const type = GetChartData(this.#points, ChartType.TYPE);
    const time = GetChartData(this.#points, ChartType.TIME);

    const getMinElement = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        if (arr[i] !== 0) {
          return arr[i];
        }
      }

      return arr[0];
    };

    const getMinLength = (arr) => {
      if (getMinElement(arr) >= 1440) {
        return 100;
      }
      else if (getMinElement(arr) >= 60) {
        return 75;
      }
      return 50;
    };

    renderChart(moneyCtx, money.labels, money.values,
      ChartType.MONEY,
      (val) => `€ ${val}`);

    renderChart(typeCtx, type.labels, type.values,
      ChartType.TYPE,
      (val) => `${val}x`);

    renderChart(timeCtx, time.labels, time.values,
      ChartType.TIME,
      (val) => `${formatMinutesInterval(val)}`,
      getMinLength(time.values));
  }
}
