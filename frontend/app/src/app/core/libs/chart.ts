import { createChart, DeepPartial, SolidColor, TimeChartOptions, ColorType, Background } from 'lightweight-charts'

import { ChartAsset, PredictedChart } from '../interfaces/chart'

export class Chart {

  public static drawChart(data : ChartAsset[], element : HTMLElement) {
    const chartOptions: DeepPartial<TimeChartOptions> = {
      layout: {
        textColor: 'black',
        background: {
          type: 'solid',
          color: 'transparent' as ColorType.Solid,
        } as DeepPartial<SolidColor>,
      },
      grid: {
        vertLines: {
          color: 'transparent',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)'
        },
      },
    };

    const chart = createChart(element, chartOptions);

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
      wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    });
    candlestickSeries.setData(data);

    chart.timeScale().fitContent();
  }

  public static drawPredictChart(data: PredictedChart[], element: HTMLElement) {
    const chartOptions = {
        layout: {
            textColor: 'black',
            background: { type: 'solid', color: 'transparent' } as SolidColor
        },
        grid: {
          vertLines: {
            color: 'transparent',
          },
          horzLines: {
            color: 'rgba(197, 203, 206, 0.5)'
          },
        },
    };

    const chart = createChart(element, chartOptions);
    const lineSeries = chart.addLineSeries({ color: '#2962FF' });

    lineSeries.setData(data);

    chart.timeScale().fitContent();
  }
}
