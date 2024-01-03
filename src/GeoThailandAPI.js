export default class GeoThailandAPI {
  #data;

  #lat;

  #lon;

  constructor() {
    this.openWeatherApiKey = process.env.OPENWEATHER_API_KEY;
    this.countryCode = "66";
  }

  async fetchDataByCityName(cityName) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},,${this.countryCode}&appid=${this.openWeatherApiKey}`;
    const response = await fetch(url, { type: "cors" });
    const data = await response.json();
    this.#data = data[0];
    this.#lat = this.#data.lat;
    this.#lon = this.#data.lon;

  }


  getLat() {
    return this.#lat;
  }

  getLon() {
    return this.#lon;
  }

  getData() {
    return this.#data;
  }




}
