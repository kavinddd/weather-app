import GeoThailandAPI from "./GeoThailandAPI";
import WeatherDTO from "./WeatherDTO";
import kelvinToCelcius from "./kelvinToCelcius";

export default class WeatherAPI {
  #geoAPI;
  #apiKey;

  constructor() {
    this.#geoAPI = new GeoThailandAPI();
    this.#apiKey = process.env.OPENWEATHER_API_KEY;
  }

  async fetchDataByCityName(name) {
    await this.#geoAPI.fetchDataByCityName(name);
    const lat = this.#geoAPI.getLat();
    const lon = this.#geoAPI.getLon();

    return this.fetchDataByLatAndLon(lat, lon)
  }

  async fetchDataByLatAndLon(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.#apiKey}`;
    const response = await fetch(url, { type: "cors" });
    const data = await response.json();

    const rawDataArray = data.list;

    return rawDataArray;
  }


}
