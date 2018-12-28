class Plot {
  constructor(data) {
    this.data = data;
  }

  draw() {
    const layout = this.initLayout();
    const plotData = this.createPlotData(this.data);
  
    Plotly.newPlot('graph', plotData, layout, { responsive: true });
  }

  initLayout() {
    return {
      title: 'Monthly Average Of Job Listings By Technology',
      xaxis: {
        title: 'Month'
      },
      yaxis: {
        title: 'Monthly Average',
        rangemode: 'tozero',
        showline: true,
        zeroline: true
      },
      annotations: []
    };
  };

  createPlotData(data) {
    let plotData = [];
  
    technologies.forEach(tech => {
      let month = data
        .filter(item => item.technology === tech)
        .map(item => item.month);
  
      let trace = {
        x: months[month],
        y: data
          .filter(item => item.technology === tech)
          .map(item => Math.round(item.average)),
        type: 'scatter',
        mode: 'lines',
        name: tech
      };
  
      plotData.push(trace);
    });
  
    return plotData;
  };
}
