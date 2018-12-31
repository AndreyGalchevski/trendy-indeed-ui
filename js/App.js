class App {
  constructor() {
    this._countries = [];
    this._technologies = [];
    this._currentYear = new Date().getFullYear();
    this._currentCountry = 'au';
    this._monthyAverages = [];
    this._earlyAverages = [];
  }

  get countries() {
    return this._countries;
  }

  get technologies() {
    return this._technologies;
  }

  get currentCountry() {
    return this._currentCountry;
  }

  set currentCountry(country) {
    this._currentCountry = country;
  }

  get currentYear() {
    return this._currentYear;
  }

  get monthyAverages() {
    return this._monthyAverages;
  }

  set monthyAverages(monthyAverages) {
    this._monthyAverages = monthyAverages;
  }

  populateCountrySelect() {
    const countrySelect = document.querySelector('select[id="country-select"]');
    for (const country of this._countries) {
      const newOption = document.createElement('option');
      newOption.value = country.code;
      newOption.innerHTML = country.name;
      countrySelect.appendChild(newOption);
    }
  }
  async init() {
    this._countries = await Api.fetchCountries();
    this._technologies = await Api.fetchTechnologies();
    this.populateCountrySelect();
    this._monthyAverages = await Api.fetchMonthlyAverages(this._currentYear, this._currentCountry);
    const plot = new Plot(this._monthyAverages, this._currentCountry);
    await plot.draw();
  }
}
