class Plot {
  constructor(data) {
    this._data = data;
    this._months = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    };
  }

  get data () {
    return this._data;
  }

  get months () {
    return this._months;
  }

  draw() {
    const layout = this.initLayout();
    const plotData = this.createPlotData();
  
    Plotly.newPlot('graph', plotData, layout, { responsive: true });
  };

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

  createPlotData() {
    let plotData = [];
    app.technologies.forEach(tech => {
      let month = this.data
        .filter(item => item.technology === tech)
        .map(item => item.month);
  
      let trace = {
        x: this.months[month],
        y: this.data
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
