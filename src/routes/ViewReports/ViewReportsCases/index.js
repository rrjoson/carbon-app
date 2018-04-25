import React from 'react';
import ReactEcharts from 'echarts-for-react';

import styles from './styles.css';

function ViewReportsCases(props) {
  const { type, data } = props;

  const seriesData = data.map((item) => {
    return (
      { name: item.case_status, value: item.number_of_cases }
    );
  });

  const legendData = [
    "梁方方方·狄史宋", "梁方方方·狄史宋", "梁方方方·狄史宋"
  ];

  const option = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
            name: '',
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data: seriesData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
  };

  return (
    <div className={styles.viewReportsCases}>
      <div className={styles.title}>SUMMARY OF CASE STATUS</div>
      <If condition={data.length}>
        <ReactEcharts
          option={option}
          opts={{renderer: 'svg'}}
          notMerge={true}
          lazyUpdate={true}
          className={styles.chart}
          theme={"theme_name"}
        />
      </If>
    </div>
  );
}

ViewReportsCases.propTypes = {};

export default ViewReportsCases;
