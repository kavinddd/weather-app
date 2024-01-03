import "./style.css";
import insertBaseInBody from "./base";
import WeatherView from "./WeatherView";

insertBaseInBody();

const weatherView = new WeatherView();

const inputDiv = weatherView.createInputDiv();
const calendar = weatherView.createCalendar();
const weathers = weatherView.createEmptyWeathers();
weatherView.loadWeathers("Bangkok")
    .then((data) => weatherView.render(data));


const content = document.querySelector(".content");

content.appendChild(inputDiv);
content.appendChild(calendar);
content.appendChild(weathers);

