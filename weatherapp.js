let cityname = document.querySelector(".weathercity");
let datetime = document.querySelector(".weatherdatetime");
let w_forecast = document.querySelector(".weatherforecast");
let w_temprature = document.querySelector(".weathertemperature");
let w_icon = document.querySelector(".weathericon");
let w_mintemp = document.querySelector(".weathermin");
let w_maxtemp = document.querySelector(".weathermax");
let w_feelslike = document.querySelector(".weatherfeelslike");
let w_humidity = document.querySelector(".weatherhumidity");
let w_wind = document.querySelector(".weatherwind");
let w_pressure = document.querySelector(".weatherpressure");
let citysearch = document.querySelector(".weathersearch");

const getcountryname = (code) => {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
};

const getdatetime = (dt) => {
    const curdate = new Date(dt * 1000);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(curdate);
};

let city = "pune";

citysearch.addEventListener('submit', (e) => {
    e.preventDefault();
    let cityinput = document.querySelector(".cityname");
    city = cityinput.value;
    getWeatherData();
    cityinput.value = "";
});

const getWeatherData = async () => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=64768cdbad3a9f70b2d061fbb1dc10f4&units=metric`;
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);
        const { main, name, weather, wind, sys, dt } = data;
        cityname.innerHTML = `${name}, ${getcountryname(sys.country)}`;
        datetime.innerHTML = getdatetime(dt);
        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;
        w_temprature.innerHTML = `${main.temp}&#176;C`;
        w_mintemp.innerHTML = `Min: ${main.temp_min.toFixed(1)}&#176;C`;
        w_maxtemp.innerHTML = `Max: ${main.temp_max.toFixed(1)}&#176;C`;
        w_feelslike.innerHTML = `${main.feels_like.toFixed(1)}&#176;C`;
        w_humidity.innerHTML = `${main.humidity}%`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('load', getWeatherData);
