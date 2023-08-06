var apiKey = '6ce1d191690920ef990a578f28900a55';
var formEl = document.querySelector('form');
var locationInputEl = document.querySelector('#location-input');
var weatherEl = document.querySelector('#weather');
var forecastEl = document.querySelectorAll('#forecast');
var list = document.querySelector("#list")


var array = []

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    var location = locationInputEl.value.trim();
    if (location) {
        array.push(location);
        locationInputEl.value = '';
    }
        localStorage.setItem("cities", JSON.stringify(array));
        retrieveWeatherData(location);
        renderSearches();
});

function renderSearches() {
    list.innerHTML = '';
    var history = JSON.parse(localStorage.getItem("cities"))
    for(var i = 0; i < history.length; i++) {
        var button = document.createElement('button')
        button.innerHTML = history[i]
        button.addEventListener("click", function(event) {
            event.preventDefault()
            const city = event.target.innerHTML
            retrieveWeatherData(city)
        })
        list.append(button)
    }

}

function retrieveWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data)
        weatherEl.innerHTML = ""
        var today = new Date(data.dt * 1000)
        var day = today.getDate()
        var month = today.getMonth() + 1
        var year = today.getFullYear()
        var date = document.createElement("h4")
        date.innerHTML = `(${month}/${day}/${year})`
        weatherEl.append(date)
        var cityName = document.createElement("h2")
        cityName.innerHTML = data.name
        weatherEl.append(cityName)
        var currentImg = document.createElement("img")
        currentImg.setAttribute("alt",  data.weather[0].description)
        currentImg.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
        weatherEl.append(currentImg)
        var currentTemp = document.createElement("h5")
        currentTemp.innerHTML = "Temp: " + Math.floor(data.main.temp) + " &#176F"
        weatherEl.append(currentTemp)
        var currentHumidity = document.createElement("h5")
        currentHumidity.innerHTML = "Humidity: " + Math.floor(data.main.humidity) + "%"
        weatherEl.append(currentHumidity)
        var currentWind = document.createElement("h5")
        currentWind.innerHTML = "Wind: " + Math.floor(data.wind.speed) + "mph"
        weatherEl.append(currentWind)
    })
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=imperial`)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data)
        for(var i = 0; i < forecastEl.length; i++) {
            forecastEl[i].innerHTML = ""
            var index = i * 8 + 4
            var today = new Date(data.list[index].dt * 1000)
            var day = today.getDate()
            var month = today.getMonth() + 1
            var year = today.getFullYear()
            var date = document.createElement("h4")
            date.innerHTML = `(${month}/${day}/${year})`
            forecastEl[i].append(date)
            var currentImg = document.createElement("img")
        currentImg.setAttribute("alt",  data.list[index].weather[0].description)
        currentImg.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[index].weather[0].icon + "@2x.png")
        forecastEl[i].append(currentImg)
        var currentTemp = document.createElement("h5")
        currentTemp.innerHTML = "Temp: " + Math.floor(data.list[index].main.temp) + " &#176F"
        forecastEl[i].append(currentTemp)
        var currentHumidity = document.createElement("h5")
        currentHumidity.innerHTML = "Humidity: " + Math.floor(data.list[index].main.humidity) + "%"
        forecastEl[i].append(currentHumidity)
        var currentWind = document.createElement("h5")
        currentWind.innerHTML = "Wind: " + Math.floor(data.list[index].wind.speed) + "mph"
        forecastEl[i].append(currentWind)
        }
    })
    
}