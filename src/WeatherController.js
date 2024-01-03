import WeatherAPI from "./WeatherAPI";
import WeatherDTO from "./WeatherDTO";
import kelvinToCelcius from "./kelvinToCelcius";

export default class WeatherController {
  weatherAPI;

  weathersByDate;

  cityName;

  constructor() {
    this.weatherAPI = new WeatherAPI();
  }

  async getWeathersByCityName(cityName) {

    if (cityName === this.cityName) {
      return this.getWeathersByDate(new Date().toISOString().split("T")[0]);
    }

    this.weathersByDate = new Map();
    const rawDataArray = await this.weatherAPI.fetchDataByCityName(cityName);

    rawDataArray.forEach((rawData) => {
      const weather = this.convertRawDataAsWeatherDTO(rawData);
      this.saveData(weather);
    });

    this.cityName = cityName;

    return this.getWeathersByDate(new Date().toISOString().split("T")[0]);
  }

  getWeathersByDate(date){ 

    if (!this.weathersByDate.has(date)) {
      return [];
    }
    
    return this.weathersByDate.get(date);
  }

  saveData(weather) {
    const key = weather.date;

    if (!this.weathersByDate.has(key)) {
        this.weathersByDate.set(key, [])
    }

    this.weathersByDate.get(key).push(weather);
  }

  convertRawDataAsWeatherDTO(rawData) {
    const dateTime = rawData.dt_txt;
    const dateTimeArray = dateTime.split(" ");
    const date = dateTimeArray[0];
    const time = dateTimeArray[1].split(":").slice(0, 2).join(":");
    const temperature = Math.round(kelvinToCelcius(rawData.main.temp));
    const {humidity} = rawData.main;
    const weather = rawData.weather[0].main;
    return new WeatherDTO(date, time, temperature, humidity, weather);
  }
}

