let weatherData = {
    city: "nagpur",
    temperature: 34,
    description: "Cloudy",
    humidity: 60,
    windSpeed: 4,
    icon: "10d"
}

let apiKey = "52c5d00f9332799cb6a68393f5781ad1";

function fetchWeather(searchedCity){
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
    + searchedCity + "&units=metric&appid=" + apiKey)
    .then((response) => response.json())
    .then((data) => storeData(data));
}

function storeData(data){
    console.log(data);
    weatherData.description = data["weather"][0]["description"];
    weatherData.icon = data["weather"][0]["icon"];
    weatherData.temperature = data["main"]["temp"];
    weatherData.humidity = data["main"]["humidity"];
    weatherData.windSpeed = data["wind"]["speed"];
    weatherData.city = data["name"];
    displayData(weatherData);
}

function displayData(weatherData){
    document.querySelector(".city").innerHTML = "Weather in " + weatherData.city;
    document.querySelector(".temperature").innerText = weatherData.temperature + " °C";
    document.querySelector(".description").innerText = weatherData.description;
    document.querySelector(".humidity").innerText = "Humidity: " +weatherData.humidity;
    document.querySelector(".wind").innerText = "Wind: " + weatherData.windSpeed + " km/h";
    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + weatherData.icon + ".png"
}

fetchWeather("Nagpur");

function search(){
    fetchWeather(document.querySelector(".search-box").value);
    document.querySelector(".search-box").value = "";
}

document.querySelector(".search-button").addEventListener("click", search);

document.querySelector(".search-box").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        search();
    }
});