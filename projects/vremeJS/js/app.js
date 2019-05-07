// setting the date
let currentDate = new Date();	
document.getElementById("date").innerHTML = stringDate(currentDate);
 
function stringDate(currentDate) {
  let mm = currentDate.getMonth()+1;
      mm = (mm < 10 ? `0${mm}` : mm);
  let dd = currentDate.getDate();
      dd = (dd < 10 ? `0${dd}`: dd);
  let hh = currentDate.getHours();
      hh = (hh < 10 ? `0${hh}` : hh);
  let min = currentDate.getMinutes();
  min = (min < 10 ? `0${min}` : min);
  return `${hh}:${min} | ${dd}/${mm}/${currentDate.getFullYear()}`;
}

// classes
class LocalStorage {
  constructor() {
    this.city;
    this.state;
    this.defaultCity = 'Belgrade';
    this.defaultState = 'RS';
  }

  getLocation() {
    if (localStorage.getItem('city') === null) {
      this.city = this.defaultCity;
    } else {
      this.city = localStorage.getItem('city');
    }

    if (localStorage.getItem('state') === null) {
      this.state = this.defaultState;
    } else {
      this.state = localStorage.getItem('state');
    }

    return {
      city: this.city,
      state: this.state
    }
  }

  setLocation(city, state) {
    localStorage.setItem('city', city);
    localStorage.setItem('state', state);
  }
}

class Weather {
  constructor(city, state) {
    this.apiKey = '4557aae956939ce49a2fe6d480b1d84d';
    this.city = city;
    this.state = state;
  }

  async getData() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&units=metric&lang=hr&APPID=${this.apiKey}`);
    const responseData = await response.json();
    return responseData;
  }

  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}

class UI {
  constructor() {
    this.location = document.getElementById('location');
    this.desc = document.getElementById('desc');
    this.string = document.getElementById('stringWeather');
    this.icon = document.getElementById('icon');
    this.humidity = document.getElementById('humidity');
    this.cloudiness = document.getElementById('cloudiness');
    this.wind = document.getElementById('wind');
  }
    
  print(weather) {
    this.location.textContent = `${weather.name}`;
    this.desc.textContent = weather.weather[0].description;
    this.string.textContent = `${weather.main.temp.toFixed(1)}\u00b0`;
    this.icon.setAttribute('src', `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`); 
    this.humidity.textContent = `${weather.main.humidity} %`;
    this.cloudiness.textContent = `${weather.clouds.all} %`;
    this.wind.textContent = `${weather.wind.speed} m/s`
  }  
}

const ls = new LocalStorage();
const weatherLocation = ls.getLocation();
const weather = new Weather(weatherLocation.city, weatherLocation.state);
const ui = new UI();

document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
  weather.getData()
    .then(data => ui.print(data))
    .catch(err => {console.log(err)})
}