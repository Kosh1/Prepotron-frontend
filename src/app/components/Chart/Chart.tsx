import ReactECharts from 'echarts-for-react';

type Props = {
  data: Array<[number, number]>;
  style?: React.CSSProperties;
  smallSplit?: boolean;
};

export const Chart = ({ data, style, smallSplit }: Props) => (
  <ReactECharts
    style={{ minWidth: 500, ...style }}
    option={{
      grid: { left: 'left', top: '5%', bottom: '5%', containLabel: true },
      xAxis: {
        type: 'value',
        splitNumber: 3,
        splitLine: {
          lineStyle: {
            opacity: 0.1,
          },
        },
      },
      yAxis: {
        type: 'value',
        splitNumber: smallSplit ? 3 : 5,
        splitLine: {
          lineStyle: {
            opacity: 0.1,
          },
        },
      },
      series: [
        {
          data,
          type: 'line',
          smooth: true,
          symbol: 'roundRect',
          symbolSize: 5,
          color: '#3399FF',
        },
      ],
    }}
    notMerge={true}
    lazyUpdate={true}
  />
);
