let technologies;
const thisYear = new Date().getFullYear();
const months = {
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

class App {
  static async init() {
      technologies = await Api.fetchTechnologies();
      const monthlyAverages = await Api.fetchMonthlyAverages(thisYear, 'il');
      const plot = new Plot(monthlyAverages);
      plot.draw();
  }
}
