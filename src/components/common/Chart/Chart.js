import React, { useEffect } from 'react';
import Chart from 'chart.js';

function Graph(props) {
  const { id, type, labels, datasets } = props;

  useEffect(() => {
    const ctx = document.getElementById(id).getContext('2d');

    const chart = new Chart(ctx, {
      type,
      data: {
        labels,
        datasets
      },
      options: {}
    });
  }, []);

  return (
    <div>
      <canvas id={id} />
    </div>
  );
}

export default Graph;
