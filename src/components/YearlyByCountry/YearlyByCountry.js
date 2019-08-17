import React, { useState, useEffect } from 'react';

import Api from '../../Api';
import BarChart from '../common/BarChart/BarChart';
import Loader from '../common/Loader/Loader';

function YearlyByCountry() {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    async function init() {
      const technologiesResponse = await Api.get('technologies');
      const countriesResponse = await Api.get('countries');

      const statsResponse = await Api.get('stats?year=2019');

      const countryTotals = {};

      statsResponse.data.forEach(stat => {
        if (!countryTotals[stat.country]) {
          countryTotals[stat.country] = stat.average;
        } else {
          countryTotals[stat.country] += stat.average;
        }
      });

      const normalizedStats = statsResponse.data.map(stat => ({
        ...stat,
        ratio: ((stat.average / countryTotals[stat.country]) * 100).toFixed(1)
      }));

      const chartData = countriesResponse.data.map(country => ({
        id: country.name
      }));

      normalizedStats.forEach(stat => {
        const index = chartData.findIndex(cd => cd.id === stat.country);
        chartData[index][stat.technology] = stat.ratio;
        const techColor = technologiesResponse.data.find(tech => tech.name === stat.technology)
          .color;
        chartData[index][`${stat.technology}Color`] = techColor;
      });

      setData(chartData);
      setKeys(technologiesResponse.data.map(tech => tech.name));
    }

    init();
  }, []);

  return (
    <div style={{ height: '500px' }}>
      <Loader isLoading={!data || data.length === 0}>
        <BarChart data={data} keys={keys} xAxisLabel="Country" yAxisLabel="% Of Job Openings" />
      </Loader>
    </div>
  );
}

export default YearlyByCountry;
