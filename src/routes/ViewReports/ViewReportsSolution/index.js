import React from 'react';
import ReactEcharts from 'echarts-for-react';

import styles from './styles.css';

function ViewReportsSolution(props) {
  const { type, data } = props;

  console.warn(data)

  const xAxisData = data.map(item => (item.vendor));
  const seriesData = data.map(item => (item.number_of_vendor_cases));

  const option = {
    xAxis: {
      type: 'category',
      data: xAxisData,
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: seriesData,
      type: 'bar'
    }]
  };

  return (
    <div className={styles.viewReportsSolution}>
      <div className={styles.title}>SOLUTION CONTRIBUTION</div>
      <ReactEcharts
        option={option}
        opts={{renderer: 'svg'}}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
      />
    </div>
  );
}

ViewReportsSolution.propTypes = {};

export default ViewReportsSolution;
