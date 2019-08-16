import React, { useState, useEffect } from 'react';

import { MONTHS } from '../../constants/months';

import Api from '../../Api';
import Chart from '../common/Chart/Chart';
import Loader from '../common/Loader/Loader';

function MonthlyByCountry() {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    async function init() {
      const technologiesResponse = await Api.get('technologies');
      const technologies = technologiesResponse.data;

      const statsResponse = await Api.get('stats?year=2019&country=il');
      const monthlyAverages = statsResponse.data;

      const stats = technologies.map(tech => {
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

      setDatasets(stats);

      const currentMonth = datasets[0].data.length;
      const months = Object.keys(MONTHS)
        .filter(key => key <= currentMonth)
        .map(key => MONTHS[key]);

      setLabels(months);
    }

    init();
  }, []);

  return (
    // <Loader isLoading={chartData.labels.length === 0 || chartData.datasets.length === 0}>
    // <Chart
    //   id="monthly-by-country"
    //   type="line"
    //   labels={chartData.labels}
    //   datasets={chartData.datasets}
    // />
    <div>
      {datasets.map(d => (
        <div>{d.label}</div>
      ))}
    </div>
    // </Loader>
  );
}

export default MonthlyByCountry;
