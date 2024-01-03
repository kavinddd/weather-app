import WeatherController from "./WeatherController";
import createElementWithClassName from "./common";

export default class WeatherView {
  weatherController;

  constructor() {
    this.weatherController = new WeatherController();
  }

  render(weathers) {
    const weathersElement = document.querySelector(".weathers");
    weathersElement.innerHTML = "";

    for (let i = 0; i < weathers.length; i++) {
      weathersElement.appendChild(this.weatherToDiv(weathers[i]));
    }
  }

  createEmptyWeathers() {
    const weathersElement = createElementWithClassName("div", "weathers");
    return weathersElement;
  }

  async loadWeathers(cityName) {
    const weathers =
      await this.weatherController.getWeathersByCityName(cityName);
    return weathers;
  }

  weatherToDiv(weatherDTO) {
    const { date, time, temperature, humidity, weather } = weatherDTO;

    const classNameList = [
      "weather-time",
      "weather-temperature",
      "weather-humidity",
      "weather-weather",
    ];
    const valueList = [time, temperature, humidity, weather];

    const weatherElement = createElementWithClassName("div", "weather");

    for (let i = 0; i < classNameList.length; i++) {
      const element = createElementWithClassName("div", classNameList[i]);
      element.textContent = valueList[i];
      weatherElement.appendChild(element);
    }

    return weatherElement;
  }

  createCalendar() {
    const calendar = createElementWithClassName("input", "calendar");
    calendar.id = "calendar";

    calendar.setAttribute("type", "date");
    calendar.value = new Date().toISOString().split("T")[0];

    // attach re-render data event (onchange)
    calendar.addEventListener("change", (e) => {
      const destinationDate = e.target.value;
      const newWeathersData =
        this.weatherController.getWeathersByDate(destinationDate);
      this.render(newWeathersData);
    });

    return calendar;
  }

  setTodayCalendar() {
    const calendar = document.querySelector("#calendar");
    const formattedDate = new Date().toISOString().split("T")[0];
    calendar.value = formattedDate;
  }

  createInputDiv() {
    const inputDiv = createElementWithClassName("div", "weather-input");

    const cityNameInput = createElementWithClassName("input", "city-name");
    cityNameInput.id = "city-name";
    cityNameInput.setAttribute("placeholder", "City Name");
    cityNameInput.value = "Bangkok";

    const button = createElementWithClassName("button", "city-name-btn");
    button.textContent = "Search";
    button.addEventListener("click", async () => {
      const newCityName = document.querySelector("#city-name").value;
      const newData =
        await this.weatherController.getWeathersByCityName(newCityName);
      this.render(newData);
      // set default as today
      this.setTodayCalendar();
    });

    inputDiv.appendChild(cityNameInput);
    inputDiv.appendChild(button);

    return inputDiv;
  }
}
