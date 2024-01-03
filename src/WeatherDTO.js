export default class WeatherDTO {

    constructor(date, time, tempCelcius, humidity, weather) {
        this.date = date;
        this.time = time;
        this.temperature = tempCelcius;
        this.humidity = humidity;
        this.weather = weather;
    }

}