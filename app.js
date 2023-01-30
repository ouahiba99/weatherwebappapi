//take value of city 
function getSelectValue()
{
    var selectedValue = document.getElementById("list").value;
    getcity(selectedValue);
}

// elemnts
const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

//app data

const weather = {};
weather.temperature = {
unit: 'celsius'
};

// const and variables
const KELVIN = 273;

///api key

const key = '0035f3a4ac0425d1c6af759c5e9f3d35';

//check if browser supports geolocalization 

if('geolocation' in navigator ){
navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
notificationElement.style.display ='block';
notificationElement.innerHTML=`<p> browser doesn't support geolocalisation`;
}

//req for weather in user position
function setPosition(position){
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;

getWeather(latitude,longitude);
}


//show err when issue geoloc server
function showError(error){
notificationElement.style.display ='block';
notificationElement.innerHTML=`<p> ${error.message}`;
}


//req for weather by city name 
function  getcity(selectedValue){
let api2 = `https://api.openweathermap.org/data/2.5/weather?q=${selectedValue}&appid=${key}`;


fetch(api2)
.then(function(response){
let data = response.json();
return data;
})
.then(function(data){
weather.temperature.value = Math.floor(data.main.temp - KELVIN);
weather.description = data.weather[0].description;
weather.iconId = data.weather[0].icon;
weather.city = data.name;
weather.country = data.sys.country;
})
.then(function() {
displayWeather();  
});
}

//display to ui
function  displayWeather(){
iconElement.innerHTML =`<img src="icons/${weather.iconId}.png"/>`;
tempElement.innerHTML =`${weather.temperature.value} ° <span>C</span>`;
descElement.innerHTML = weather.description;
locationElement.innerHTML = `${weather.city}, ${weather.country}`;
};
