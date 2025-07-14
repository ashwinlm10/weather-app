document.addEventListener('DOMContentLoaded',() => {
    let cityInput = document.getElementById("city-input")
    let getWeatherBtn = document.getElementById("get-weather-btn")
    let weatherInfo = document.getElementById("weather-info")
    let cityNameDisplay = document.getElementById("city-name")
    let temperatureDisplay = document.getElementById("temperature")
    let descriptionDisplay = document.getElementById("description")
    let errorMessage = document.getElementById("error-message")

    let API_KEY = "4736b0aa7266665e8fbeba16c0fe9b1a"

   getWeatherBtn.addEventListener('click', async() => {
    let city = cityInput.value.trim()
    if(!city) return;

    // it may throw an error 
    // server/database is always in another continent

    try {
        let weatherData = await fetchWeatherData(city)
        displayweatherData(weatherData)
    } catch (error) {
        showError()
    }


   })

   async function fetchWeatherData(city){
    // gets the data

    let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units-metric&appid=${API_KEY}`;
    let response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);

    if(!response.ok){
        throw new Error("city not found")
    }
    let data = await response.json()
    return data
   }
   function displayweatherData(data){
    // display

    console.log(data)
    let {name,main,weather} = data
    cityNameDisplay.textContent = name

    // unclock the display

    weatherInfo.classList.remove('hidden')
    errorMessage.classList.add('hidden')
    temperatureDisplay.textContent =`Temperature :${main.temp}`
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`
   }
   function showError(){
    weatherInfo.classList.remove('hidden')
    errorMessage.classList.add('hidden')
   }

})