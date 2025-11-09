const weatherContainer = document.querySelector('#current-temp');
const weatherIconContainer = document.querySelector('#weather-icon');
const weatherCaptionContainer = document.querySelector('#weather-caption');

const lat = 49.749821477419495;
const lon = 6.6377719422022565;
const APIKey = '10ef9792635c3a6ce4e14945789be45e';
const units = 'imperial';/* 'imperial' 'metric' */
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${APIKey}`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if(response.ok) {
            const data = await response.json();
            console.log(data); // testing only
            displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch(error) {
        console.error(error);
    }    
}

function displayResults(data) {
    const temp = data.main.temp;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const weatherIconURL = `https://openweathermap.org/img/w/${icon}.png`;
    if(units === 'imperial') {
        symbol = "F";
    } else {
        symbol = "C";
    }
    weatherContainer.textContent = `${temp}\u00B0${symbol}`;
    weatherCaptionContainer.textContent = description;
    weatherIconContainer.src = weatherIconURL;
    weatherIconContainer.alt = description;
}

apiFetch();