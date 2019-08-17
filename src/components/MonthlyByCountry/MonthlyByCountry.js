import React, { useState, useEffect } from 'react';

import { MONTHS } from '../../constants/months';

import apiClient from '../../Api/apiClient';
import LineChart from '../common/LineChart/LineChart';
import Loader from '../common/Loader/Loader';

function MonthlyByCountry() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function init() {
      const technologiesResponse = await apiClient.get('technologies');

      const statsResponse = await apiClient.get('stats?year=2019&country=il');

      const stats = technologiesResponse.data.map(tech => ({
        id: tech.name,
        color: tech.color,
        data: statsResponse.data
          .filter(stat => stat.technology === tech.name)
          .sort((a, b) => a.month - b.month)
          .map(stat => ({
            x: MONTHS[stat.month],
            y: Math.round(stat.average)
          }))
      }));

      setData(stats);
    }

    init();
  }, []);

  return (
    <div style={{ height: '500px' }}>
      <Loader isLoading={!data || data.length === 0}>
        <LineChart data={data} xAxisLabel="Month" yAxisLabel="# Of Job Openings" />
      </Loader>
    </div>
  );
}

export default MonthlyByCountry;
