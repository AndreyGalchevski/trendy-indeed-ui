import React, { useEffect } from 'react';
import Chart from 'chart.js';

import { MONTHS } from '../../constants/months';

import Api from '../../Api';

function Graph() {
  useEffect(() => {
    async function initPlotData() {
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

      const ctx = document.getElementById('myChart').getContext('2d');

      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May'],
          // labels: Object.values(MONTHS),
          datasets
        },
        options: {}
      });
    }

    initPlotData();
  }, []);

  return (
    <div>
      <canvas id="myChart" />
    </div>
  );
}

export default Graph;
