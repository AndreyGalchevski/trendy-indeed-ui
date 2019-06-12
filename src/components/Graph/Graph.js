import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';

import { MONTHS } from '../../constants/months';

import Api from '../../Api';

function Graph() {
  const [country, setCountry] = useState('il');

  useEffect(() => {
    async function init() {
      const technologiesResponse = await Api.get('technologies');
      const technologies = technologiesResponse.data;

      const statsResponse = await Api.get(`stats?year=2019&country=${country}`);
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

      const currentMonth = datasets[0].data.length;
      const labels = Object.keys(MONTHS)
        .filter(key => key <= currentMonth)
        .map(key => MONTHS[key]);

      const ctx = document.getElementById('myChart').getContext('2d');

      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets
        },
        options: {}
      });
    }

    init();
  }, []);

  return (
    <div>
      <canvas id="myChart" />
    </div>
  );
}

export default Graph;
