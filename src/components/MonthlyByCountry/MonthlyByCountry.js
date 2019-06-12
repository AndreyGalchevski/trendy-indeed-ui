import React, { useState, useEffect } from 'react';

import { MONTHS } from '../../constants/months';

import Api from '../../Api';
import Chart from '../common/Chart/Chart';

function MonthlyByCountry() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    async function init() {
      const technologiesResponse = await Api.get('technologies');
      const technologies = technologiesResponse.data;

      const statsResponse = await Api.get('stats?year=2019&country=il');
      const monthlyAverages = statsResponse.data;

      const datasets = technologies.map(tech => {
        return {
          label: tech.name,
          borderColor: [tech.color],
          fill: false,
          data: monthlyAverages
            .filter(stat => stat.technology === tech.name)
            .sort((a, b) => a.month - b.month)
            .map(stat => Math.round(stat.average))
        };
      });

      setChartData({ ...chartData, datasets });

      const currentMonth = datasets[0].data.length;
      const labels = Object.keys(MONTHS)
        .filter(key => key <= currentMonth)
        .map(key => MONTHS[key]);

      setChartData({ ...chartData, labels });
    }

    init();
  }, []);

  return (
    chartData.labels.length > 0 &&
    chartData.datasets.length > 0 && (
      <Chart
        id="monthly-by-country"
        type="line"
        labels={chartData.labels}
        datasets={chartData.datasets}
      />
    )
  );
}

export default MonthlyByCountry;
