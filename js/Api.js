class Api {
  static async fetchCountries() {
    try {
      let response = await axios.get('https://trendy-indeed-api.herokuapp.com/api/countries');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async fetchTechnologies() {
    try {
      let response = await axios.get('https://trendy-indeed-api.herokuapp.com/api/technologies');
      return response.data.map(item => item.name);
    } catch (error) {
      throw error;
    }
  }

  static async fetchMonthlyAverages(year, country) {
    try {
      let response = await axios.get(`https://trendy-indeed-api.herokuapp.com/api/stats?year=${year}&country=${country}`);
      return response.data
    } catch (error) {
      throw error;
    }
  }
}