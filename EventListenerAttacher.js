class EventListenerAttacher {
  static init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initMaterializeCss();
      this.initCountrySelect();
    }, false);
  };

  static initMaterializeCss() {
    M.AutoInit();
  };

  static initCountrySelect() {
    const countrySelect = document.querySelector('select[id="country-select"]');
    countrySelect.addEventListener('change', async e => {
      const selectedCountry = e.target.value;
      const monthlyAverages = await Api.fetchMonthlyAverages(thisYear, selectedCountry);
      const plot = new Plot(monthlyAverages);
      plot.draw(); 
    });
  }
};