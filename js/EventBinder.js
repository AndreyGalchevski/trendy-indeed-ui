class EventBinder {
  static init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.bindCountrySelect();
    }, false);
  };

  static bindCountrySelect() {
    const countrySelect = document.querySelector('select[id="country-select"]');
    countrySelect.addEventListener('change', async e => {
      const selectedCountry = e.target.value;
      const monthlyAverages = await Api.fetchMonthlyAverages(app.currentYear, selectedCountry);
      const plot = new Plot(monthlyAverages);
      plot.draw();
    });
  }
};