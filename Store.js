class Store {
  constructor() {
    this._countries = [];
    this._technologies =[];
    this._currentCountry = '';
    this._thisYear = new Date().getFullYear();
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
    return this._currentCountry = country;
  }

  get thisYear() {
    return this._thisYear;
  }

  get months() {
    return this._months;
  }

  async init() {
    this._countries = await Api.fetchCountries();
    this._technologies = await Api.fetchTechnologies();
    this._currentCountry = 'il';
  }
}