import AbstractView from './abstract-view.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { GetChartData } from '../utils/point-tools.js';
import { formatMinutesInterval } from '../utils/date-time';

const labels = ['TAXI', 'BUS', 'TRAIN', 'SHIP', 'DRIVE', 'FLIGHT', 'CHECK-IN', 'SIGHTSEENG', 'RESTAURANT'];

const renderChart = (ctx, data, title, formatter, minLength = 50) => {
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

    const data = GetChartData(this.#points)

    renderChart(moneyCtx, data.money, 'MONEY', (val) => `€ ${val}`);
    renderChart(typeCtx, data.type, 'TYPE', (val) => `${val}x`);
    renderChart(timeCtx, data.time, 'TIME', (val) => `${formatMinutesInterval(val)}`, 75);
  }
}
