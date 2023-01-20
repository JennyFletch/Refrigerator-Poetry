// API INFO
const datamuseBaseUrl = "https://api.datamuse.com/words";

// datamuse samples 

// Nouns meaning pants, max of 10
// https://api.datamuse.com/words?mdp=n&ml=pants&max=10 

// Nouns about pants, max of 10
// https://api.datamuse.com/words?mdp=n&rel_trg=pants&max=10

// Nouns that rhyme with pants, max of 10
// https://api.datamuse.com/words?mdp=n&rel_rhy=pants&max=10


// GLOBAL VARIABLES
var staticFragmentsEl = document.getElementById("static-fragments");
var staticWordsEl = document.getElementById("static-words");
var findWordsBtnEl = document.getElementById("find-words-btn");
var wordsDynamicEl = document.getElementById("word-list-dynamic");
const wordsToRequest = 32;


function loadStaticWords() {

    for(var i=0; i < staticFragments.length; i++) {
        var newStaticFragment = document.createElement("div");
        newStaticFragment.className = "magnet";
        newStaticFragment.innerHTML = staticFragments[i];
        staticFragmentsEl.appendChild(newStaticFragment);
    }

    for(var i=0; i < staticWords.length; i++) {
        var newStaticWord = document.createElement("div");
        newStaticWord.className = "magnet";
        newStaticWord.innerHTML = staticWords[i];
        staticWordsEl.appendChild(newStaticWord);
    }
}

loadStaticWords();


findWordsBtnEl.addEventListener("click", function(e) {
    e.preventDefault();

    if(document.getElementById("words-subject").value) {

        while (wordsDynamicEl.firstChild) {
            wordsDynamicEl.removeChild(wordsDynamicEl.firstChild);
        }
        
        const fwPos = "u"; // document.getElementById("words-pos").value; 
        const fwBeh = document.getElementById("words-behavior").value;
        const fwSub = document.getElementById("words-subject").value;

        const requestUrl = `${datamuseBaseUrl}?mdp=${fwPos}&${fwBeh}=${fwSub}&max=${wordsToRequest}`;

        fetch(requestUrl) 
        .then(function (response) {
            // Check for response from datamuse request
            if(response.status === 200) {
            return response.json();
            } else { 
                console.log("Error receiving data: " + response.status);
            }
        })
        .then(function (data) {

            // console.log(data[0].word);

            for(var i=0; i < wordsToRequest; i++) {
                if(data[i].word) {
                    var newDynamicWord = document.createElement("div");
                    newDynamicWord.className = "magnet";
                    newDynamicWord.innerHTML = data[i].word;
                    wordsDynamicEl.appendChild(newDynamicWord);
                } else {
                    alert("No words matched your search. Please try something else.");
                }
            }
        });
    } else {
        alert("Please include a subject and try your search again.");
    }
});



/* 
// GLOBAL VARIABLES
var submitBtnEl = document.getElementById("btn-submit");
var cityInputEl = document.getElementById("city-input");
var forecastTodayEl = document.getElementById("forecast-today");
var forecastFivedayEl = document.getElementById("forecast-fiveday");
var cityName;
var cityShortcutsEl = document.getElementById("city-shortcuts");
var cityShortcuts = []; // array to hold city names saved to localStorage
var apiData = {};

function getTheWeather(cityName) {

    // Get latitude and longitude of current city
    var requestUrl = openweatherBaseUrl + openweatherGeocoder + cityName + '&appid=' + openweatherKey;

    fetch(requestUrl) 
    .then(function (response) {
        // Check for response from openweather API call
        if(response.status === 200) {
          return response.json();
        } else { 
            console.log("Error receiving data: " + response.status);
        }
    })
    .then(function (data) {
        //console.log("in getApi function: " + data[0].lat);
        // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
        var weatherTodayUrl = openweatherBaseUrl + 'data/2.5/weather?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&appid=' + openweatherKey;
        var weatherForecastUrl = openweatherBaseUrl + 'data/2.5/forecast/daily?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&cnt=5&appid=' + openweatherKey;

        // Get today's weather in the selected city
        fetch(weatherTodayUrl)
        .then(function (response2) {
            // Check for response from openweather API call
            if(response2.status === 200) {
                return response2.json();
              } else { 
                  console.log("Error receiving data: " + response2.status);
              }
        })
        .then(function (owWeather) {
            // Build display of today's weather
            var cityDateAndIcon = document.createElement('h3');
            cityDateAndIcon.textContent = cityName + " (" + dateToday + ")";
            var weatherIcon = document.createElement('img');
            var iconUrl = "https://openweathermap.org/img/wn/" + owWeather.weather[0].icon + "@2x.png";
            weatherIcon.setAttribute("src", iconUrl);
            cityDateAndIcon.appendChild(weatherIcon);
            forecastTodayEl.setAttribute("style", "visibility:visible");
            forecastTodayEl.appendChild(cityDateAndIcon);
            var dataTemp = document.createElement("p");
            dataTemp.textContent = "Temp: " + owWeather.main.temp + "\u00B0F";
            forecastTodayEl.appendChild(dataTemp);
            var dataWind = document.createElement("p");
            dataWind.textContent = "Wind: " + owWeather.wind.speed + "MPH";
            forecastTodayEl.appendChild(dataWind);
            var dataHumidity = document.createElement("p");
            dataHumidity.textContent = "Humidity: " + owWeather.main.humidity + "%";
            forecastTodayEl.appendChild(dataHumidity);
        });

        // Get 5-day forecast in the selected city
        fetch(weatherForecastUrl)
        .then(function (response3) {
            // Check for response from openweather API call
            if(response3.status === 200) {
                return response3.json();
              } else { 
                  console.log("Error receiving data: " + response3.status);
              }
        })
        .then(function (owForecast) {
            // Build display of 5-day forecast
            var forecastTitle = document.createElement("h4");
            forecastTitle.textContent = "5-Day Forecast:";
            forecastFivedayEl.appendChild(forecastTitle);
            var forecastList = document.createElement("ul");
            forecastFivedayEl.appendChild(forecastList);
            
            for (var i=0; i<5; i++) {
                var listItem = document.createElement("li");
                forecastList.appendChild(listItem);
                var forecastTitle = document.createElement("h5");
                var forecastDate = dateDay + i + 1;
                var liTitle = dateMonth + "/" + forecastDate + "/" + dateYear;
                forecastTitle.textContent = liTitle;
                listItem.appendChild(forecastTitle);
                var forecastIcon = document.createElement("img");
                var iconUrl = "https://openweathermap.org/img/wn/" + owForecast.list[i].weather[0].icon + "@2x.png";
                forecastIcon.setAttribute("src", iconUrl);
                listItem.appendChild(forecastIcon);
                var forecastTemp = document.createElement("p");
                forecastTemp.textContent = "Temp: " + owForecast.list[i].temp.day + "\u00B0F";
                listItem.appendChild(forecastTemp);
                var forecastWind = document.createElement("p");
                forecastWind.textContent = "Wind: " + owForecast.list[i].gust + "MPH";
                listItem.appendChild(forecastWind);
                var forecastHumidity = document.createElement("p");
                forecastHumidity.textContent = "Humidity: " + owForecast.list[i].humidity + "%";
                listItem.appendChild(forecastHumidity);
            }
        });
        
    }); 
}

function makeCityButton(cityName) {
    var cityBtn = document.createElement('li');
    cityBtn.textContent = cityName;
    cityShortcutsEl.appendChild(cityBtn);
}

function addNewShortcut(cityName) {
    // build a new shortcut and display it on page
    cityInputEl.value = ''; // clear the input field for another use
    makeCityButton(cityName);
    saveToLocalStorage(cityName);
}
  
function getSavedShortcuts() {
    // Get shortcut cities from localStorage
    var savedShortcuts = JSON.parse(localStorage.getItem('cityShortcuts'));

    if(savedShortcuts)  {
    // Add each to cityShortcuts array and display on the page
        savedShortcuts.forEach((cityName) => {
            cityShortcuts.push(cityName);
            makeCityButton(cityName);
        });
    }
}

function saveToLocalStorage(cityName) {
    // Add city to cityShortcuts array and save all to localStorage 
     cityShortcuts.push(cityName);
     window.localStorage.setItem("cityShortcuts", JSON.stringify(cityShortcuts))
}

function forceResubmit() {
    // prompt user to resubmit city name
    alert("Please enter a city.");
    location.reload();
}

function clearOldData() {
    // Clear out any previous forecast data being displayed

    while (forecastTodayEl.firstChild) {
        forecastTodayEl.removeChild(forecastTodayEl.firstChild);
    }

    while (forecastFivedayEl.firstChild) {
        forecastFivedayEl.removeChild(forecastFivedayEl.firstChild);
    }  
}

submitBtnEl.addEventListener("click", function(e) {
    e.preventDefault();

    if (cityInputEl.value) {
        // Get weather for submitted city
        cityName = cityInputEl.value;
        addNewShortcut(cityName); // build a shortcut button and display it on the page
        clearOldData();
        getTheWeather(cityName); 
    } else {
        forceResubmit();
    }
});

cityShortcutsEl.addEventListener("click", function(e) {
   // Get weather info for shortcut city
    var shortcutCity = e.target.textContent;
    clearOldData();
    getTheWeather(shortcutCity); 
});

getSavedShortcuts(); // grab shortcuts from localStorage and display below form */